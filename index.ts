export namespace Utils {
  export class Enums {
    public static ONE_DAY = 86400;
    public static ONE_HOUR = 86400;
    public static ONE_MINUTE = 60;

    public static IMAGE_EXTENSIONS = [".jpg", ".png", ".webp", ".gif", ".svg", ".jpeg", ".apng", ".ico"];
    public static AUDIO_EXTENSIONS = [".flac", ".ogg", ".aiff", ".aac", ".mp3", ".wav"];
    public static VIDEO_EXTENSIONS = [".mp4", ".webm", ".flv", ".mov", ".mkv"];
  }

  export class Formatters {
    /**
     * Pads a number with a zero
     * @param number the number to pad
     */
    public static pad = (number: number) => number < 10 ? `0${number}` : number;

    /**
     * Converts seconds to a human readable string
     * @param sec the seconds to convert
     */
    public static secondsToString = (sec: number) => {
      const hours =   this.pad(~~((sec % Enums.ONE_DAY) / Enums.ONE_HOUR));
      const minutes = this.pad(~~(((sec % Enums.ONE_DAY) % Enums.ONE_HOUR) / Enums.ONE_MINUTE));
      const seconds = this.pad(~~((sec % Enums.ONE_DAY) % Enums.ONE_HOUR) % Enums.ONE_MINUTE);
      return hours === '0' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }

    /**
     * Capitalizes every first character of every word in a sentence
     * @param string the string to capitalize
     * @returns capitalized string
     */
    public static capitalizeWords = (string: string) => {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
        .join(" ");
    };

  }

  export class DOM {
    /**
     * Updates a CSS variable's value
     * @param variableName the css variable to change
     * @param value the value to set it to
     */
    public static updateCSSVar = (variableName: string, value: string) => {
      document.documentElement.style.setProperty(variableName, value);
    }
  }

  export class Arithmetic {
    /**
     * Returns a logarithmic index relative to min max values
     * @param value the value to get the logarithmic index of
     * @param min the min value it can be
     * @param max the max value it can be
     * @returns {number} of the index
     */
    public static getLogIndex = (value: number, min: number, max: number) => {
      const exp = (value / min) / (max - min);
      return min * (max / min) ** exp;
    }

    /**
     * Creates a logarithmic version of an array
     * @param array the array to transform
     */
    public static transformLogarithmic = (array: Uint8Array): Uint8Array => {
      const logArray = [];

      for (let i = 1; i < array.length; i++) {
        const idx = this.getLogIndex(i, 1, array.length - 1);
        const low = ~~idx;
        const high = Math.ceil(idx);
        const lv = array[low];
        const hv = array[high];
        const w = (idx - low) / (high - low);
        const v = lv + (hv - lv) * w;
        logArray.push(v);
      }
      
      return new Uint8Array(logArray);
    }
  }
}