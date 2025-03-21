import { localized, msg, str } from '@lit/localize';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import prettyBytes from 'pretty-bytes';
import { encrypt } from '../utils/cipher';
import { clamp } from '../utils/clamp';
import { generateFonts } from '../utils/font';
import { zipFiles } from '../utils/zip';

declare global {
  interface HTMLElementTagNameMap {
    'ak-cipher': AkCipher;
  }
}

@localized()
@customElement('ak-cipher')
export class AkCipher extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      @unocss-placeholder;
    `,
  ];

  @state() fontUrl?: string;

  @state() originalText =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

  @state() encryptedText = '';

  @state() shiftNumber = 3;

  @state() originalFontFile?: File;

  @state() generatedFontFiles?: File[];

  @state() zipFile?: File;

  connectedCallback() {
    super.connectedCallback();

    this.encrypt();
  }

  protected render() {
    return html`<div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="original-text">${msg('Original text')}</label>
        <textarea
          id="original-text"
          class="border-none bg-transparent text-default rounded-sm p-3 break-all outline-1 outline-solid outline-default"
          .value=${this.originalText}
          @input=${this.onOriginalTextChange}
          @blur=${this.encrypt}
        ></textarea>
        <span class="text-default/80 text-sm -mt-1">
          ${msg(str`Count: ${this.originalText.length}`)}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <label for="shift-number">${msg('Shift number')}</label>
        <input
          id="shift-number"
          class="border-none bg-transparent text-default rounded-sm p-3 outline-1 outline-solid outline-default"
          type="number"
          min="1"
          max="94"
          .value=${live(`${this.shiftNumber}`)}
          @input=${this.onShiftNumberChange}
          @blur=${this.encrypt}
        />
        <span class="text-default/80 text-sm -mt-1">
          ${msg('From 1 to 94')}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <label for="encrypted-text">${msg('Encrypted text')}</label>
        <textarea
          id="encrypted-text"
          class="border-none bg-transparent text-default rounded-sm p-3 break-all outline-1 outline-solid outline-default"
          .value=${this.encryptedText}
          readonly
        ></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <label for="font-file">${msg('Font file')}</label>
        <div>
          <input
            id="font-file"
            class="border-none rounded-sm py-2 opacity-0 absolute"
            type="file"
            accept=".eot,.ttf,.woff,.woff2"
            @input=${this.onFontFileChange}
          />
          <label
            class="i-heroicons-plus-circle-solid block size-12 cursor-pointer hover:text-sky-6"
            for="font-file"
          ></label>
        </div>
        <span class="text-default/80 text-sm -mt-1">
          ${this.originalFontFile?.name ||
          msg('Please select a normal font file')}
        </span>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <button
          class="border-1 border-solid border-transparent rounded-sm p-3 bg-sky-7 hover:border-sky-6 active:border-sky-8 text-white text-base cursor-pointer disabled:text-gray-3 disabled:bg-gray-4 disabled:cursor-not-allowed disabled:hover:border-gray-4 disabled:active:border-gray-4"
          type="button"
          ?disabled=${!this.originalFontFile || !this.originalText}
          @click=${this.generateFonts}
        >
          ${msg('Generate fonts')}
        </button>
        ${this.renderFontDownload()}
      </div>
    </div>`;
  }

  private onOriginalTextChange(e: Event) {
    this.originalText = (e.target as HTMLTextAreaElement).value!;
  }

  private onShiftNumberChange(e: Event) {
    this.shiftNumber = +(e.target as HTMLInputElement).value!;
  }

  private encrypt() {
    this.shiftNumber = clamp(this.shiftNumber, 1, 94);

    if (!this.originalText) {
      this.encryptedText = '';

      return;
    }

    this.encryptedText = encrypt(this.originalText, this.shiftNumber);
  }

  private onFontFileChange(e: Event) {
    const { files } = e.target as HTMLInputElement;

    if (files?.length) {
      // eslint-disable-next-line prefer-destructuring
      this.originalFontFile = files[0];
    }
  }

  private async generateFonts() {
    this.generatedFontFiles = await generateFonts(
      this.originalFontFile!,
      this.originalText,
      this.shiftNumber,
    );

    this.zipFile = await zipFiles(this.generatedFontFiles);
  }

  private renderFontDownload() {
    if (!this.generatedFontFiles || !this.zipFile) {
      return nothing;
    }

    return html`<p>${msg('Download the generated new fonts')}</p>
      <div class="grid grid-cols-[1fr_auto] gap-2">
        ${repeat(
          this.generatedFontFiles,
          (file) =>
            html`<a
                class="text-sky-6 underline flex items-center gap-1"
                href=${URL.createObjectURL(file)}
                download=${file.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>${file.name}</span>
              </a>
              <span class="text-right">${prettyBytes(file.size)}</span>`,
        )}
      </div>
      <a
        class="mt-4 border-1 border-solid border-transparent rounded-sm p-3 bg-sky-7 hover:border-sky-6 active:border-sky-8 text-white text-base cursor-pointer disabled:bg-neutral-4 disabled:cursor-not-allowed no-underline text-center"
        href=${URL.createObjectURL(this.zipFile)}
        download=${this.zipFile.name}
        target="_blank"
        rel="noopener noreferrer"
      >
        ${msg('Download all as ZIP:')}
        <span>${this.zipFile.name}</span>
        <span>${prettyBytes(this.zipFile.size)}</span>
      </a>`;
  }
}
