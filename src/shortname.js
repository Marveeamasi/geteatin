const shortname = (str,num) => {
    
    if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '..' + str.slice(str.length-4,str.length)
 
}

export default shortname