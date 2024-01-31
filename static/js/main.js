switchTheme = () => {
    console.log("here")
    if( document.getElementById("switch").checked == false ){
      document.querySelector(".content").classList.remove("dark");
      console.log("here2")
    }else{
      document.querySelector(".content").classList.add("dark");
      console.log("here3")
    }
  }
  
  document.getElementById("switch").addEventListener("change", switchTheme)