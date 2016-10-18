
var self = {
	makePositons: function() {
		PositionGroup.create([
			{name: 'ГСМ', costtype: 'cost', positions: [{name: 'ДТ'}, {name: 'АИ80'}]},
			{name: 'Ремонт', costtype: 'cost', positions: [{name: 'Запчасти'}, {name: 'Аренда бокса'}]},
			{name: 'Оплата договоров', costtype: 'income', positions: [{name: 'Оплата по договору№1'}, {name: 'Оплата по договору №2'}]},
		]).exec(console.log);
	},

	makeDivisions: () => {
		DivisionGroup.create([
			{name: 'Тягачи'},
			{name: 'КАМАЗы'},
			{name: 'Малотоннажки'},
			{name: 'Офис'}
		])
			.then((listOfGroups) => {
				Division.create([
					{name: 'Газель К376КУ18', mileage: 97351, groups: [listOfGroups[2].id]},
					{name: 'Камаз Е361ЕВ18', mileage: 211103, groups: [listOfGroups[0].id, listOfGroups[1].id]},
					{name: 'VOLVO S402', mileage: 591790, groups: [listOfGroups[0].id]},
					{name: 'Офис', mileage: 0, groups: [listOfGroups[3].id]}
				])
					.exec(console.log)
		});
	},

	makeDocuments: function() {
			DocumentType.create([
				{name: 'Авансовый отчет', costType: 'cost'},
				{name: 'Накладная', costType: 'cost'},
				{name: 'Декларация', costType: 'cost'},
				{name: 'Ведомость', costType: 'cost'},
				{name: 'Поступления', costType: 'income'},
			]).then((listOfDocumentTypes) => {
				"use strict";
				Document.create([{
					number: 1,
					division: 1,
					documentType: 1
				}, {
					number: 2,
					division: 3,
					documentType: 2
				}, {
					number: 3,
					division: 4,
					documentType: 4
				}])
					.then((listOfDocs) => {
						PositionDocument.create([
							{position: 1, piecesCount: 1, pricePerPiece: 1250, price: 1250, document: 1},
							{position: 2, piecesCount: 1, pricePerPiece: 2520, price: 2520, document: 1},
							{position: 3, piecesCount: 1, pricePerPiece: 2010, price: 2010, document: 2},
							{position: 1, piecesCount: 1, pricePerPiece: 10000, price: 10000, document: 2},
							{position: 5, piecesCount: 1, pricePerPiece: 120000, price: 120000, document: 3},
							{position: 6, piecesCount: 1, pricePerPiece: 32000, price: 32500, document: 3},
						])
							.exec(console.log)
					});
			});
	},

	makeAll: () => {
		"use strict";
		self.makePositons();
		self.makeDivisions();
		self.makeDocuments();
	}
}

module.exports = self;