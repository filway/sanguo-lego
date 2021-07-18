import { enableDownloadType, enableImageDownloadType } from "./defaultProps";

export const materialDownLoad = (
  src: string,
  ext: enableDownloadType | enableImageDownloadType
): void => {
  const aLink = document.createElement("a");
  aLink.href = src;
  aLink.download = "test." + ext;
  if (ext === "svg") {
    aLink.dataset.downloadurl = [
      "image/svg+xml;charset=utf-8",
      aLink.download,
      aLink.href,
    ].join(":");
  }
  aLink.style.display = "none";
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  setTimeout(function () {
    URL.revokeObjectURL(aLink.href);
  }, 1500);
};
// svg节点转base64
export const svgToBase64 = (svg: string): string => {
  const div = document.createElement("div");
  div.innerHTML = svg;
  const s = new XMLSerializer().serializeToString(
    div.firstElementChild as HTMLElement
  );
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(s))
  )}`;
  return ImgBase64;
};
