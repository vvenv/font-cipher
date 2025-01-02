import JSZip from "jszip";

export const zipFiles = async (files: File[]) => {
  var zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file);
  });

  const blob = await zip.generateAsync({ type: "blob" });

  return new File([blob], "encrypted-fonts.zip", {
    type: "application/zip",
  });
}

