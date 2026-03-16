export const SERVER_CONFIG = {
  ip: '10.0.2.2',
  port: 3000,
  get url() {
    return `http://${this.ip}:${this.port}`;
  },
};
