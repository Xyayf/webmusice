// import router from '../router'
export function push (url) {
  if (this.$route.path !== url) {
    this.$router.push(url)
  }
}
