import fs from "fs";

// #################################################################

var KNOWN_EXPRESSIONS = ["vox", "pxz", "pxy", "pyz", "cub"];

// #################################################################

//read from file
var inputFile = fs.readFileSync("input.vox", "utf-8");

//convert file input to lines
var inputLines = inputFile.split(/(\r\n|\n|\r)/);
inputLines = inputLines.filter((line) => line.replace(/(\r\n|\n|\r)/gm, "") != "");

var expressions = [];

inputLines.forEach((line) => {
	if (line.length < 3) return;
	if (line.startsWith("#")) return;
	var expression = extractParts(line);

	expressions.push(expression);
});

expressions = expressions.filter((exp) => KNOWN_EXPRESSIONS.includes(exp.name));

// #################################################################

var objects = [];

expressions.forEach((exp) => {
	switch (exp.name) {
		case "vox":
			objects.push(expToVOX(exp));
			break;
		case "pxz":
			objects.push(expToPXZ(exp));
			break;

		case "pxy":
			objects.push(expToPXY(exp));
			break;

		case "pyz":
			objects.push(expToPYZ(exp));
			break;
		case "cub":
			objects.push(expToCUB(exp));
			break;
	}
});
objects = objects.filter((cmd) => typeof cmd !== "undefined");

fs.writeFileSync("out.json", JSON.stringify(objects), "utf-8");

// #################################################################

function extractParts(expression) {
	expression = expression.replace(/\s/g, "");
	expression = expression.replace(/;/g, "");
	if (expression.includes("#")) {
		expression = expression.substring(0, expression.indexOf("#"));
	}
	var cmd = expression.substring(0, 3);

	var paramString = expression.substring(4, expression.length - 1);
	var params = extractParams(paramString);

	var expressionObject = { name: cmd, params: params };

	return expressionObject;
}

function extractParams(inputParams) {
	var params = inputParams.split(",");

	params.forEach((param, index) => {
		params[index] = Number(param.replace(/\s/g, ""));
	});

	return params;
}

// #################################################################

function expToVOX(exp) {
	if (exp.params.length != 3) return undefined;
	return { type: "vox", params: { posX: exp.params[0], posY: exp.params[1], posZ: exp.params[2] } };
}
function expToPXZ(exp) {
	if (exp.params.length != 5) return undefined;
	return {
		type: "pxz",
		params: {
			posX: exp.params[0],
			posY: exp.params[1],
			posZ: exp.params[2],
			lenX: exp.params[3],
			lenZ: exp.params[4],
		},
	};
}
function expToPXY(exp) {
	if (exp.params.length != 5) return undefined;
	return {
		type: "pxy",
		params: {
			posX: exp.params[0],
			posY: exp.params[1],
			posZ: exp.params[2],
			lenX: exp.params[3],
			lenY: exp.params[4],
		},
	};
}
function expToPYZ(exp) {
	if (exp.params.length != 5) return undefined;
	return {
		type: "pxz",
		params: {
			posX: exp.params[0],
			posY: exp.params[1],
			posZ: exp.params[2],
			lenY: exp.params[3],
			lenZ: exp.params[4],
		},
	};
}
function expToCUB(exp) {
	if (exp.params.length != 6) return undefined;
	return {
		type: "cub",
		params: {
			posX: exp.params[0],
			posY: exp.params[1],
			posZ: exp.params[2],
			lenX: exp.params[3],
			lenY: exp.params[4],
			lenZ: exp.params[5],
		},
	};
}

// #################################################################
