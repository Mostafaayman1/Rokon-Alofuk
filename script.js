// عندما يتم تحميل الصفحة
window.onload = function () {
  // اجلب كل الأزرار والأقسام
  const buttons = document.querySelectorAll('.main-buttons button');
  const sections = document.querySelectorAll('.section-content');

  // إخفاء كل الأقسام عند البداية
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // تحديد الزر الأول كمفعّل تلقائيًا (مثلاً زر الإيجار)
  if (buttons.length > 0) {
    buttons[0].classList.add('active');
    const firstSectionID = buttons[0].nextElementSibling.id;
    document.getElementById(firstSectionID).style.display = 'block';
  }

  // عند الضغط على أي زر
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      // إزالة التفعيل من كل الأزرار
      buttons.forEach(btn => btn.classList.remove('active'));

      // إخفاء جميع الأقسام
      sections.forEach(sec => {
        sec.style.display = 'none';
      });

      // تفعيل الزر الحالي
      this.classList.add('active');

      // إظهار القسم المناسب
      const section = this.nextElementSibling;
      if (section && section.classList.contains('section-content')) {
        section.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.toggle-buttons .toggle').forEach(button => {
    button.addEventListener('click', () => {
      console.log("زر تم الضغط عليه:", button.textContent); // للتجربة

      // إزالة التفعيل من جميع الأزرار
      document.querySelectorAll('.toggle-buttons .toggle').forEach(btn => btn.classList.remove('active'));

      // تفعيل الزر الذي تم الضغط عليه
      button.classList.add("active");
    });
  });
};
