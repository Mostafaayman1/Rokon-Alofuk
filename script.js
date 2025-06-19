window.onload = function () {
  const buttons = document.querySelectorAll('.main-buttons button');
  const sections = document.querySelectorAll('.section-content');

  // استخراج معايير البحث من الرابط
  const params = new URLSearchParams(window.location.search);
  const searchParams = {
    status: (params.get("status") || "").trim().toLowerCase(),
    type: (params.get("type") || "").trim().toLowerCase(),
    area: (params.get("area") || "").trim().toLowerCase()
  };

  // تحميل البيانات وتطبيق الفلترة
  fetch('properties.json')
    .then(response => response.json())
    .then(data => {
      const filtered = data.filter(item => {
        const itemStatus = (item.status || "").trim().toLowerCase();
        const itemType = (item.type || "").trim().toLowerCase();
        const itemArea = (item.area || "").trim().toLowerCase();

        return (!searchParams.status || itemStatus === searchParams.status) &&
               (!searchParams.type || itemType === searchParams.type) &&
               (!searchParams.area || itemArea === searchParams.area);
      });

      renderResults(filtered);
    })
    .catch(error => {
      console.error("حدث خطأ أثناء تحميل البيانات:", error);
      document.getElementById('results').innerHTML = '<p>حدث خطأ أثناء تحميل البيانات.</p>';
    });

  // عرض النتائج
  function renderResults(properties) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!properties || properties.length === 0) {
      resultsDiv.innerHTML = '<p>لا توجد نتائج مطابقة للبحث.</p>';
      return;
    }

    properties.forEach(property => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${property.image}" alt="${property.title}">
        <div class="card-body">
          <h3>${property.title}</h3>
          <p>المنطقة: ${property.area}</p>
          <p>النوع: ${property.type}</p>
          <p>الغرف: ${property.rooms}</p>
          <p>دورات المياه: ${property.bathrooms}</p>
          <p>الصالات: ${property.halls}</p>
          <p><strong>السعر: ${property.price} ريال</strong></p>
          <a href="tel:${property.phone || '0501234567'}" class="contact-btn">اتصال</a>
        </div>
      `;

      resultsDiv.appendChild(card);
    });
  }

  // تصفية حسب نوع العقار
  const typeFilter = document.getElementById("propertyType");
  if (typeFilter) {
    typeFilter.addEventListener("change", function () {
      const selectedType = this.value.trim().toLowerCase();

      fetch("properties.json")
        .then(response => response.json())
        .then(data => {
          const filtered = selectedType
            ? data.filter(item => (item.type || "").trim().toLowerCase() === selectedType)
            : data;

          renderResults(filtered);
        });
    });
  }

  // إخفاء جميع الأقسام
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }
