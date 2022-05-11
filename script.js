const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const title = document.querySelector('h1');
let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");
  // console.log(progressActive);
  title.innerText = progressActive[progressActive.length - 1].getAttributeNode("data-title").value;
  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

const inputs = document.querySelectorAll('input[type=number]');
inputs.forEach(function (input, id) {
  input.addEventListener('keypress', function (event) {
    input.value = input.value.replace('-', '');
  })
});
//calculating
const tiLeLamThem = 1.5;
const tiLeLamDem = 0.5;
const tiLeLamDacBiet = 1.5;
const baoHiemLaoDong = 0.8;
const baoHiemSucKhoe = 3.335;
const baoHiemTaiNan = 0.13;
const luongHuuQuocGia = 4.5;

function calculate() {
  let luongGross;
  let luongNet;
  inputs.forEach(function (input, index) {
    if (input.value.trim() == '') {
      input.value = 0;
    }
  });
  let luongCoBan = parseInt(inputs[4].value) * parseInt(inputs[0].value);
  let luongLamThem = parseInt(inputs[4].value) * parseInt(inputs[1].value) * tiLeLamThem;
  let luongLamDem = parseInt(inputs[4].value) * parseInt(inputs[2].value) * tiLeLamDem;
  let luongLamDacBiet = parseInt(inputs[4].value) * parseInt(inputs[3].value) * tiLeLamDacBiet;

  luongGross = luongCoBan + luongLamThem + luongLamDem + luongLamDacBiet;
  let tienBaoHiemLaoDong = luongGross * baoHiemLaoDong * 0.01;
  let tienBaoHiemSucKhoe = luongGross * baoHiemSucKhoe * 0.01;
  let tienBaoHiemTaiNan = luongGross * baoHiemTaiNan * 0.01;
  let tienLuongHuu = luongGross * luongHuuQuocGia * 0.01;
  luongNet = luongGross - tienBaoHiemLaoDong - tienBaoHiemSucKhoe - tienBaoHiemTaiNan - tienLuongHuu;

  //display
  document.querySelector('h3').innerText=document.querySelector('#ten').value;

  document.querySelector('span#coban').innerText=inputs[4].value;
  document.querySelector('span#lamthem').innerText=tiLeLamThem;
  document.querySelector('span#lamdem').innerText=tiLeLamDem;
  document.querySelector('span#dacbiet').innerText=tiLeLamDacBiet;

  document.querySelector('span#laodong').innerText=baoHiemLaoDong;
  document.querySelector('span#suckhoe').innerText=baoHiemSucKhoe;
  document.querySelector('span#tainan').innerText=baoHiemTaiNan;
  document.querySelector('span#huu').innerText=luongHuuQuocGia;
  
  document.querySelector('span#tiencoban').innerText=`${inputs[4].value} x ${inputs[0].value} = ${luongCoBan}`;
  document.querySelector('span#tienlamthem').innerText=`${inputs[4].value} x ${inputs[1].value} x ${tiLeLamThem} = ${luongLamThem}`;
  document.querySelector('span#tienlamdem').innerText=`${inputs[4].value} x ${inputs[2].value} x ${tiLeLamDem} = ${luongLamDem}`;
  document.querySelector('span#tiendacbiet').innerText=`${inputs[4].value} x ${inputs[3].value} x ${tiLeLamDacBiet} = ${luongLamDacBiet}`;

  document.querySelector('span#thuelaodong').innerText=tienBaoHiemLaoDong.toFixed(3);
  document.querySelector('span#thuesuckhoe').innerText=tienBaoHiemSucKhoe.toFixed(3);
  document.querySelector('span#thuetainan').innerText=tienBaoHiemTaiNan.toFixed(3);
  document.querySelector('span#thuehuu').innerText=tienLuongHuu.toFixed(3);

  document.querySelector('span#luonggros').innerText=luongGross;
  let tongthue = tienBaoHiemLaoDong + tienBaoHiemSucKhoe + tienBaoHiemTaiNan + tienLuongHuu
  document.querySelector('span#thue').innerText = tongthue.toFixed(3);
  document.querySelector('span#luongnet').innerText=`${luongGross} - ${tongthue.toFixed(3)} = ${luongNet.toFixed(3)}`;

  document.querySelector('#result').classList.add('show');
  document.querySelector('form').classList.add('hide');
  console.log(luongCoBan, luongLamThem, luongLamDem, luongLamDacBiet);
}