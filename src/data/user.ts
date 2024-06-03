export interface User {
    firstName: string;
    surname: string;
}

export function extractUser(formData: FormData): User {
    return {
        firstName: formData.get('firstName') as string,
        surname: formData.get('surname') as string,
    };
}
