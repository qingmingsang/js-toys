export const getScrollEntity = () => {
    let ele = document.documentElement || document.body.parentNode;
    ele = (ele && typeof ele.scrollTop == 'number') ? ele : document.body;
    return ele;
}

export const scrollToElement = (element, fix = 0, speed = 60) => {
    if (element && element.getBoundingClientRect) {
        let rect = element.getBoundingClientRect();
        let sTop = getScrollEntity().scrollTop;
        let top = Math.ceil(sTop + rect.top + Number(fix));
        let currentTop = sTop;
        let requestId;
        const step = () => {
            if (currentTop < top) {
                currentTop += speed;
            } else if (currentTop > top) {
                currentTop -= speed;
            }
            if (Math.abs(currentTop - top) > speed) {
                window.scrollTo(0, currentTop);
                requestId = setTimeout(() => {
                    step();
                }, 16);
            } else {
                clearTimeout(requestId);
                window.scrollTo(0, top);
            }
        }
        setTimeout(() => {
            step();
        }, 16);
    } else {
        console.warn(element, '没捕获到元素 或 不支持getBoundingClientRect')
    }
}
