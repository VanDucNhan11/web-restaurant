document.addEventListener("DOMContentLoaded", function() {
    var tinTucSection = document.querySelector(".tin-tuc");

    // Hàm kiểm tra xem phần tử có trong tầm nhìn của trình duyệt không
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Hàm xử lý hiển thị phần tử khi lướt đến
    function handleScroll() {
        if (isElementInViewport(tinTucSection)) {
            tinTucSection.classList.add("active");
            window.removeEventListener("scroll", handleScroll);
        }
    }

    // Thêm sự kiện lắng nghe cuộn trang
    window.addEventListener("scroll", handleScroll);
});
