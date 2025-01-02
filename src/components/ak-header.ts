import { localized, msg, str } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getLocale } from '../utils/i18n';

declare global {
  interface HTMLElementTagNameMap {
    'ak-header': AkHeader;
  }
}

@localized()
@customElement('ak-header')
export class AkHeader extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      @unocss-placeholder;
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();

    document.title = msg(str`Font Cipher`);
  }

  protected render() {
    const locale = getLocale();

    return html`<div class="flex items-center justify-between">
        <h1 class="text-3xl">${msg(str`Font Cipher`)}</h1>
        <div class="flex items-center gap-2">
          <a
            class="text-default hover:text-blue-6"
            href=${`?lang=${locale === 'en' ? 'zh' : 'en'}`}
            title=${msg(
              str`View ${locale === 'en' ? '中文' : 'English'} version`,
            )}
          >
            <i class="i-heroicons-language-solid size-6 block"></i>
          </a>
          <button
            class="h-6 w-6 p-0 relative border-none bg-transparent cursor-pointer text-default hover:text-blue-6"
            type="button"
            title=${msg(str`Toggle dark theme`)}
            @click=${() => {
              document.documentElement.classList.toggle('dark');
              localStorage.setItem(
                'dark',
                document.documentElement.classList.contains('dark')
                  ? 'true'
                  : 'false',
              );
            }}
          >
            <i
              class="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity i-heroicons-sun size-6"
            ></i>
            <i
              class="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity i-heroicons-moon size-6"
            ></i>
          </button>
        </div>
      </div>
      <p class="text-xl mt-0 mb-12">
        ${msg(
          str`Generate customized fonts for displaying text content encrypted
          with Caesar cipher with specified shift number.`,
        )}
      </p>`;
  }
}
