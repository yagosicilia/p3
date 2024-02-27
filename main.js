
function loadSection(section) {
  fetch(`sections/${section}.json`)
    .then(res => res.json())
    .then(sectionData => {
      document.getElementById('title').innerText = sectionData.title;
      document.getElementById('header-title').innerText = sectionData.title;

      
      const mainContent = document.getElementById('main-content');
      mainContent.innerHTML = '';

      if (sectionData.title === 'Inicio' || sectionData.title === 'Peces') {
        
        sectionData.sections.forEach(child => {
          const element = document.createElement(child.tag);
          if (child.class) {
            element.className = child.class;
          }
          if (child.content) {
            element.innerHTML = child.content;
          }
          if (child.children) {
            child.children.forEach(subChild => {
              const subElement = document.createElement(subChild.tag);
              if (subChild.class) {
                subElement.className = subChild.class;
              }
              if (subChild.content) {
                subElement.innerHTML = subChild.content;
              }
              if (subChild.tag === 'video') {
                if (subChild.controls) subElement.controls = true;
                if (subChild.autoplay) subElement.autoplay = true;
                if (subChild.muted) subElement.muted = true;
                if (subChild.loop) subElement.loop = true;

                if (subChild.children && subChild.children[0].src) {
                  const sourceElement = document.createElement('source');
                  sourceElement.src = subChild.children[0].src;
                  sourceElement.type = 'video/mp4';
                  subElement.appendChild(sourceElement);
                }
              }
              element.appendChild(subElement);
            });
          }
          mainContent.appendChild(element);
        });
      } else if (sectionData.title === 'Peceras' || sectionData.title === 'Formulario') {
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = sectionData.content;
      }
    })
    .catch(error => {
      console.error('Error fetching section data:', error);
    });
}

// Cargar la sección específica al cargar la página
//loadSection('Peceras');
