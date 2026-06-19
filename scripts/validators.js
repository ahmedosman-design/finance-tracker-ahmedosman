function validate(desc, amount, category, date) {

    const descRe = /^\S(?:.*\S)?$/;
    const amountRe = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    const dateRe = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const catRe = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    if (!descRe.test(desc)) return "Invalid description";
    if (!amountRe.test(amount)) return "Invalid amount";
    if (!catRe.test(category)) return "Invalid category";
    if (!dateRe.test(date)) return "Invalid date";

    if (/\b(\w+)\s+\1\b/i.test(desc)) return "Duplicate words not allowed";

    return null;
}