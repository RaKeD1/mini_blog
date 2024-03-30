export const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return function(this: any, ...args: any[]) {
        const context = this;

        const later = function() {
            timeoutId = null;
            func.apply(context, args);
        };

        clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
        timeoutId = setTimeout(later, delay);
    };
}