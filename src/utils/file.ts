export const validateFileExtension = (file: File, allowedExtensions: string[]): boolean => {
  const fileName = file.name.toLowerCase();

  return allowedExtensions.some((extension) => {
    const normalizedExtension = extension.toLowerCase();
    // .으로 시작하지 않으면 추가
    const ext = normalizedExtension.startsWith(".") ? normalizedExtension : `.${normalizedExtension}`;
    return fileName.endsWith(ext);
  });
};
