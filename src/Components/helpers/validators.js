export const isRequired = value => !!value.length ? undefined: 'The Field Is Not Required';

export const maxLength = length => value => value.length > length ? 'The Max Length Is ' + length  : undefined;
export const minLength = length => value => value.length < length ? 'The Min Length Is ' + length  : undefined;
export const  validateEmail=email=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : 'Invalide Email'
}