export const SERVER_CONFIG = {
  ip: 'localhost',
  port: 3000,
  get url() {
    return `http://${this.ip}:${this.port}`;
  },
};
