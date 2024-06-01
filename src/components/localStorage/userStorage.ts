function submitHandler(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement);
    const userInfo = {
        username: data.get('firstName'),
        surname: data.get('surname'),
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export default submitHandler;
