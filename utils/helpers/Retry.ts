async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const attempt = () => {
      fn()
        .then(resolve)
        .catch((error: any) => {
          if (retries === 0) {
            reject(error);
          } else {
            retries--;
            setTimeout(attempt, delay);
          }
        });
    };
    attempt();
  });
}

export default retry;
