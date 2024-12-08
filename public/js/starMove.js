const getContainer = () => {
    const container = document.querySelector(".star-container");
    return container;
  };
  
  const setRandomColor = () => {
    const colors = ["#4ade80", "#2dd4bf", "#22d3ee", "#60a5fa", "#a78bfa"];
    const randomNumber = Math.floor(Math.random() * 4);
    return colors[randomNumber];
  };
  
  const calculateDistance = (last, current) => {
    const a = last.x - current.x;
    const b = last.y - current.y;
    const c = Math.sqrt(a * a + b * b);
    return Math.ceil(c);
  };
  
  const dot = (positionX, postionY) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.left = `${positionX}px`;
    dot.style.top = `${postionY}px`;
    dot.innerHTML = `
      <svg
        style="color:${setRandomColor()};height:0.8rem;width:0.8rem"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
          clip-rule="evenodd"
        />
      </svg>
    `;
    return dot;
  };
  
  const glow = (positionX, postionY) => {
    const glow = document.createElement("div");
    glow.classList.add("glow");
    glow.style.left = `${positionX}px`;
    glow.style.top = `${postionY}px`;
    return glow;
  };
  
  const onMouseMoveConatainer = (e) => {
    const { x, y } = e ?? {};
    const container = getContainer();
    const lastChild = container.lastChild;
    const last = { x: lastChild.offsetLeft, y: lastChild.offsetTop };
    const current = { x: x, y: y };
    let timeout = null;
    const glowDiv = glow(x, y);
    const container1 = document.querySelector(".star-container1");
    container1.append(glowDiv);
    const timeout1 = setTimeout(() => {
      container1.removeChild(glowDiv);
    }, 100);
  
    if (lastChild.offsetLeft && lastChild.offsetTop) {
      if (calculateDistance(last, current) > 50) {
        const dotDiv = dot(x, y - 8);
        container.append(dotDiv);
        timeout = setTimeout(() => {
          container.removeChild(dotDiv);
        }, 300);
      }
    } else {
      const dotDiv = dot(x, y - 8);
      container.append(dotDiv);
      timeout = setTimeout(() => {
        container.removeChild(dotDiv);
      }, 300);
    }
  
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout1);
    };
  };
  
  const onWindowResize = () => {
    const container = getContainer();
    container.style.height = `${window.innerHeight - 1}px`;
  };
  
  window.addEventListener("resize", onWindowResize);
  
  window.addEventListener("DOMContentLoaded", () => {
    const container = getContainer();
    // on mouse move on container
    container.addEventListener("mousemove", onMouseMoveConatainer);
  });
  