const adminChoices = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM'
];

export function showAdminChoices() {
    adminChoices.forEach((choice) => console.log(choice));
}