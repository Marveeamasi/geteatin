const shorten = (str,num) => {
    if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...see more'
 
}

export default shorten