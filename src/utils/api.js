export const getUsers = () => {
    return new Promise(res => setTimeout(res, 1000, [
        {
            name: 'Pablo',
            city: 'Madrid',
        },
        {
            name: 'Javier',
            city: 'Barcelona',
        },
        {
            name: 'Laura',
            city: 'Bogotá',
        },
        {
            name: 'María',
            city: 'Ciudad de México',
        },
    ]));
};
