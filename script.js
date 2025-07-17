var jpdbBaseURl = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var connToken = "90934986|-31949251293372130|90959199";
$("#rollno").focus();

function saveRecNo2LS(jsonObj){
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno",lvData.rec_no);
}

function getRollAsJsonObj(){
  var stu_rollno = $("#rollno").val();
  var jsonStr = {
    roll_no: stu_rollno
  };
  return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
  saveRecNo2LS(jsonObj);
  var record =  JSON.parse(jsonObj.data).record;
  $("#stuName").val(record.name);
  $("#stuClass").val(record.class);
  $("#stuBirth").val(record.birth);
  $("#stuAddress").val(record.address);
  $("#stuEnDate").val(record.endate);
}

function resetForm() {
  $("#rollno").val("");
  $("#stuName").val("");
  $("#stuClass").val("");
  $("#stuBirth").val("");
  $("#stuAddress").val("");
  $("#stuEnDate").val("");
  $("#rollno").prop("disabled",false);
  $("#save").prop("disabled",true);
  $("#change").prop("disabled",true);
  $("#reset").prop("disabled",true);
  $("#rollno").focus();

}

function validateData() {
  var stu_rollno, stu_name, stu_class, stu_birth, stu_address, stu_endate;
  stu_rollno = $("#rollno").val();
  stu_name = $("#stuName").val();
  stu_class = $("#stuClass").val();
  stu_birth = $("#stuBirth").val();
  stu_address = $("#stuAddress").val();
  stu_endate = $("#stuEnDate").val();

  if (stu_rollno === ''){
    alert("Student Roll-no missing");
    $("#rollNo").focus();
    return "";
  }
  if (stu_name === ''){
    alert("Student name missing");
    $("#stuName").focus();
    return "";
  }
  if (stu_class=== ''){
    alert("Student Class missing");
    $("#stuClass").focus();
    return "";
  }
  if (stu_birth === ''){
    alert("Student Birth-date missing");
    $("#stuBirth").focus();
    return "";
  }
  if (stu_address === ''){
    alert("Student Address missing");
    $("#stuAddress").focus();
    return "";
  }
  if (stu_endate === ''){
    alert("Student Enrollment-date missing");
    $("#stuEnDate").focus();
    return "";
  }
  var jsonStrObj = {
    roll_no: stu_rollno,
    name: stu_name,
    class: stu_class,
    birth: stu_birth,
    address: stu_address,
    endate: stu_endate
  };
  return JSON.stringify(jsonStrObj);
}

function getRoll(){
  var rollJsonObj = getRollAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,rollJsonObj);
  jQuery.ajaxSetup({async: false});
  var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURl,jpdbIRL);
  jQuery.ajaxSetup({async: true});
  if(resJsonObj.status === 400) {
    $("#save").prop("disabled",false);
    $("#reset").prop("disabled",false);
    $("#stuName").focus();
  } else if (resJsonObj.status === 200){
    $("#rollno").prop("disabled",true);
    fillData(resJsonObj);
    $("#change").prop("disabled",false);
    $("#reset").prop("disabled",false);
    $("#stuName").focus();
  }
}

function saveData(){
  var jsonStrObj = validateData();
  if(jsonStrObj === ''){
    return "";
  }
  var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
  jQuery.ajaxSetup({async: false});
  var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURl,jpdbIML);
  jQuery.ajaxSetup({async: true});
  resetForm();
  $("#rollno").focus();
}

function changeData() {
  $("#change").prop("disabled",true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecordRequest(connToken, jsonChg,stuDBName,stuRelationName,localStorage.getItem("recno"));
  jQuery.ajaxSetup({async: false});
  var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURl,jpdbIML);
  jQuery.ajaxSetup({async: true});
  console.log(resJsonObj);
  resetForm();
  $("#rollno").focus();

}















