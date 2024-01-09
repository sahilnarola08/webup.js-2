/**
 * Composable functions for images
 * @returns
 */
export default function useImage() {
  /**
   * Set correct image path:
   * - Url
   * - Assets
   * @param value
   * @returns
   */
  const getResource = (value: string): string => {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    } else {
      return "./assets/svg/" + value + ".svg";
    }
  };

  return {
    getResource,
  };
}
