export const NUMBER_OF_TILES = 6;

export const getColors = (value: number): string => {
  switch (value) {
    case 2:
      return "#04aa9e";
    case 4:
      return "#0271bb";
    case 8:
      return "#2e3192";
    case 16:
      return "#b57fac";
    case 32:
      return "#93268f";
    case 64:
      return "#2baf76";
    case 128:
      return "#fb8c00";
    case 256:
      return "#f4511e";
    case 512:
      return "#f57c00";
    case 1024:
      return "#e64a19";
    case 2048:
      return "#ef6c00";
    case 4096:
      return "#d84315";
    case 8192:
      return "#e65100";
    default:
      return "#a1887f";
  }
};
