export const utils = {
  uuid() {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
    const uuid = [];
    let i;
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }

    return uuid.join("");
  },
  debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  },
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  waitForCondition(
    conditionFn,
    failText,
    timeout,
    interval,
  ) {
    return new Promise((resolve, reject) => {
      const endTime = Date.now() + timeout; // 设置超时的结束时间

      const checkCondition = () => {
        if (conditionFn()) {
          // 如果条件函数返回true，则resolve
          resolve();
        } else if (Date.now() > endTime) {
          // 如果当前时间超过了结束时间，则reject
          reject(new Error(failText));
        } else {
          // 如果条件未满足，且还没到结束时间，间隔一段时间后再次检查
          setTimeout(checkCondition, interval);
        }
      };

      // 初始检查
      checkCondition();
    });
  },
};
