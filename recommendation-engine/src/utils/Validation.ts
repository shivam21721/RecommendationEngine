export function isValidNumber(id: string) {
    const regex = /^[1-9]\d*$/; 
    return regex.test(id);
}

export function areAllItemsUnique(menuItems: number[]) {
    const uniqueElements = new Set(menuItems);
    return uniqueElements.size === menuItems.length;
}