const dataMemory = {}; // Memory to store fetched data

const sharedContent = $("#shared-content");
const rows = $("#shared-content .row");
const cols1 = $(".col1");
const cols2 = $(".col2");
const select1 = $("#select1");
const select2 = $("#select2");

select1.change(function () {
  const selectedValue = $(this).val();
  const col = "col1";
  handleSelectChange(selectedValue, col);
});

select2.change(function () {
  const selectedValue = $(this).val();
  const col = "col2";
  handleSelectChange(selectedValue, col);
});

function handleSelectChange(selectedValue, col) {
  if (!selectedValue) {
    // No option selected
    clearDataContainer(col);

    if (col === "col1"){
        cols1.hide();
    } else{
        cols2.hide();
    }
    
    if (!select1.val() && !select2.val()) {
      sharedContent.hide();
    }
    else{
        rows.removeClass("row-cols-2");
    }
  } else {
    if (col === "col1"){
        cols1.show();
    } else{
        cols2.show();
    }

    sharedContent.show();

    if (select1.val() && select2.val()) {
        rows.addClass("row-cols-2");
    }

    if (!dataMemory[selectedValue]) {
      // Fetch and parse data from XML file
      fetchAndParseData(selectedValue, col);
    } else if (dataMemory[selectedValue]) {
      // Update HTML with the existing data
      updateHTMLWithData(dataMemory[selectedValue], col);
    }
  }
}

function fetchAndParseData(option, col) {
  // Perform a fetch request to the XML file
  fetch(`data/${option}.xml`)
    .then((response) => response.text())
    .then((xmlData) => {
      // Parse the XML data
      const parsedData = parseXML(xmlData);

      // Store the parsed data in memory
      dataMemory[option] = parsedData;

      // Update HTML with the fetched data
      updateHTMLWithData(parsedData, col);
    })
    .catch((error) => console.log("Error:", error));
}

function parseXML(xmlData) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");

  const rootElement = xmlDoc.getElementsByTagName("root")[0];
  const parsedData = {};

  // Parse general, variables, comments, and output elements
  parsedData.syntax = getElementData(rootElement, "syntax");
  parsedData.comments = getElementData(rootElement, "comments");
  parsedData.output = getElementData(rootElement, "output");

  // Parse datatypes element and its sub-elements
  const datatypesElement = rootElement.getElementsByTagName("datatypes")[0];
  parsedData.datatypes = {};
  parsedData.datatypes.general = getElementData(datatypesElement, "general");
  parsedData.datatypes.boolean = getElementData(datatypesElement, "boolean");
  parsedData.datatypes.numeric = getElementData(datatypesElement, "numeric");
  parsedData.datatypes.string = getElementData(datatypesElement, "string");
  parsedData.datatypes.array = getElementData(datatypesElement, "array");
  parsedData.datatypes.hashtable = getElementData(
    datatypesElement,
    "hashtable"
  );
  parsedData.datatypes.other = getElementData(datatypesElement, "other");

  // Parse operators element and its sub-elements
  const operatorsElement = rootElement.getElementsByTagName("operators")[0];
  parsedData.operators = {};
  parsedData.operators.arithmetic = getElementData(
    operatorsElement,
    "arithmetic"
  );
  parsedData.operators.logrel = getElementData(operatorsElement, "logrel");

  // Parse loops element and its sub-elements
  const loopsElement = rootElement.getElementsByTagName("loops")[0];
  parsedData.loops = {};
  parsedData.loops.for = getElementData(loopsElement, "for");
  parsedData.loops.while = getElementData(loopsElement, "while");

  // Parse OOP element and its sub-elements
  const oopElement = rootElement.getElementsByTagName("OOP")[0];
  parsedData.OOP = {};
  parsedData.OOP.overview = getElementData(oopElement, "overview");
  parsedData.OOP.example = getElementData(oopElement, "example");

  return parsedData;
}

function getElementData(parentElement, elementName) {
  const element = parentElement.getElementsByTagName(elementName)[0];
  return element ? element.innerHTML : "";
}


const elSyntax = $("[name='syntax']");
const elComments = $("[name='comments']");
const elOutput = $("[name='output']");

const elDTGeneral = $("[name='dt-general']");
const elBoolean = $("[name='dt-boolean']");
const elNumeric = $("[name='dt-numeric']");
const elString = $("[name='dt-string']");
const elArray = $("[name='dt-array']");
const elHashtable = $("[name='dt-hashtable']");
const elOther = $("[name='dt-other']");

const elArithmetic = $("[name='operators-arithmetic']");
const elLogrel = $("[name='operators-logrel']");

const elFor = $("[name='loops-for']");
const elWhile = $("[name='loops-while']");

const elOverview = $("[name='oop-overview']");
const elExample = $("[name='oop-example']");

function updateHTMLWithData(data, col) {
    elSyntax.find(`.${col}`)[0].innerHTML = data.syntax;
    elComments.find(`.${col}`)[0].innerHTML = data.comments;
    elOutput.find(`.${col}`)[0].innerHTML = data.output;

    elDTGeneral.find(`.${col}`)[0].innerHTML = data.datatypes.general;
    elBoolean.find(`.${col}`)[0].innerHTML = data.datatypes.boolean;
    elNumeric.find(`.${col}`)[0].innerHTML = data.datatypes.numeric;
    elString.find(`.${col}`)[0].innerHTML = data.datatypes.string;
    elArray.find(`.${col}`)[0].innerHTML = data.datatypes.array;
    elHashtable.find(`.${col}`)[0].innerHTML = data.datatypes.hashtable;
    elOther.find(`.${col}`)[0].innerHTML = data.datatypes.other;

    elArithmetic.find(`.${col}`)[0].innerHTML = data.operators.arithmetic;
    elLogrel.find(`.${col}`)[0].innerHTML = data.operators.logrel;

    elFor.find(`.${col}`)[0].innerHTML = data.loops.for;
    elWhile.find(`.${col}`)[0].innerHTML = data.loops.while;

    elOverview.find(`.${col}`)[0].innerHTML = data.OOP.overview;
    elExample.find(`.${col}`)[0].innerHTML = data.OOP.example;

    Prism.highlightAll();
}

function clearDataContainer(col) {
    elSyntax.find(`.${col}`).html("");
    elComments.find(`.${col}`).html("");
    elOutput.find(`.${col}`).html("");

    elDTGeneral.find(`.${col}`).html("");
    elBoolean.find(`.${col}`).html("");
    elNumeric.find(`.${col}`).html("");
    elString.find(`.${col}`).html("");
    elArray.find(`.${col}`).html("");
    elHashtable.find(`.${col}`).html("");
    elOther.find(`.${col}`).html("");

    elArithmetic.find(`.${col}`).html("");
    elLogrel.find(`.${col}`).html("");

    elFor.find(`.${col}`).html("");
    elWhile.find(`.${col}`).html("");

    elOverview.find(`.${col}`).html("");
    elExample.find(`.${col}`).html("");
}

$("#swapper").on("click", function () {
  var v1 = $("#select1").val();
  $("#select1").val($("#select2").val());
  $("#select2").val(v1);
  $("#select1, #select2").trigger("change");
});
