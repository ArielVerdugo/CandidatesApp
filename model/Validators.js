const minimalLength = length => text => (text.length >= length
  ? { isValid: true }
  : { isValid: false, message: `Minimal length is ${length}` });

const maximalLength = length => text => (text.length <= length
  ? { isValid: true }
  : { isValid: false, message: `Maximal length is ${length}` });

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const correctEmail = text => (emailRegexp.test(text.toLowerCase())
  ? { isValid: true }
  : { isValid: false, message: 'Not a valid email' });

export default { maximalLength, minimalLength, correctEmail };
