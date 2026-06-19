export const patterns = {
    description: /^\S(?:.*\S)?$/,
    amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
    category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
};

export function validateField(type, value) {
    return patterns[type].test(value);
}