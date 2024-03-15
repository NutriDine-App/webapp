// All NutritionIX nutrient names & ID.
// Nutrients we don't want on the watch list have been commented out.

const nutrientWatchListIDs = {
  Calcium: 301,
  Iron: 303,
  Potassium: 306,
  Sodium: 307,
  "Sugars, added": 539,
  "Vitamin D": 324,
  "Sugar Alcohol": 299,
  Erythritol: 1001,
  Allulose: 1006,
  Glycerin: 1002,
  Xylitol: 290,
  Sorbitol: 261,
  Mannitol: 260,
  Maltitol: 1003,
  Isomalt: 1004,
  Lactitol: 1005,
  Alanine: 513,
  "Alcohol, ethyl": 221,
  Arginine: 511,
  Ash: 207,
  "Aspartic acid": 514,
  Betaine: 454,
  Caffeine: 262,
  Campesterol: 639,
  "Carotene, alpha": 322,
  "Carotene, beta": 321,
  "Vitamin D3 (cholecalciferol)": 326,
  "Choline, total": 421,
  "Cryptoxanthin, beta": 334,
  Copper: 312,
  Cystine: 507,
  "Vitamin D2 (ergocalciferol)": 325,
  "Fatty acids, total monounsaturated": 645,
  "Fatty acids, total polyunsaturated": 646,
  "Fatty acids, total trans-monoenoic": 693,
  "Fatty acids, total trans-polyenoic": 695,
  Fluoride: 313,
  "Folate, total": 417,
  "Folic acid": 431,
  "Folate, DFE": 435,
  "Folate, food": 432,
  Fructose: 212,
  Galactose: 287,
  "Glutamic acid": 515,
  "Glucose (dextrose)": 211,
  Glycine: 516,
  Histidine: 512,
  Hydroxyproline: 521,
  Isoleucine: 503,
  Lactose: 213,
  Leucine: 504,
  "Lutein + zeaxanthin": 338,
  Lycopene: 337,
  Lysine: 505,
  Maltose: 214,
  Methionine: 506,
  Magnesium: 304,
  "Menaquinone-4": 428,
  Manganese: 315,
  Niacin: 406,
  "Vitamin E, added": 573,
  "Vitamin B-12, added": 578,
  Phosphorus: 305,
  "Pantothenic acid": 410,
  Phenylalanine: 508,
  Phytosterols: 636,
  Proline: 517,
  Riboflavin: 405,
  Selenium: 317,
  Serine: 518,
  "Beta-sitosterol": 641,
  Starch: 209,
  Stigmasterol: 638,
  Sucrose: 210,
  Theobromine: 263,
  Thiamin: 404,
  Threonine: 502,
  "Vitamin E (alpha-tocopherol)": 323,
  "Tocopherol, beta": 341,
  "Tocopherol, delta": 343,
  "Tocopherol, gamma": 342,
  Tryptophan: 501,
  Tyrosine: 509,
  Valine: 510,
  "Vitamin A, IU": 318,
  "Vitamin A, RAE": 320,
  "Vitamin B-12": 418,
  "Vitamin B-6": 415,
  "Vitamin C, total ascorbic acid": 401,
  "Vitamin D (D2 + D3)": 328,
  "Vitamin K (phylloquinone)": 430,
  Dihydrophylloquinone: 429,
  Water: 255,
  Zinc: 309,
  "Tocotrienol, alpha": 344,
  "Tocotrienol, beta": 345,
  "Tocotrienol, gamma": 346,
  "Tocotrienol, delta": 347,
  //   "Energy (kJ)": 268,
  //   "Fiber, total dietary": 291,
  //   Protein: 203,
  //   "Sugars": 269,
  //   "Carbohydrate": 205,
  //   Cholesterol: 601,
  //   Energy: 208,
  //   "Fatty acids, total saturated": 606,
  //   "Total lipid (fat)": 204,
  //   "Fatty acids, total trans": 605,
  //   "Adjusted Protein": 257,
  //   "22:1 t": 664,
  //   "22:1 c": 676,
  //   "18:3i": 856,
  //   "18:2 t not further defined": 665,
  //   "18:2 i": 666,
  //   Retinol: 319,
  //   "10:00": 610,
  //   "12:00": 611,
  //   "13:00": 696,
  //   "14:00": 612,
  //   "14:01": 625,
  //   "15:00": 652,
  //   "15:01": 697,
  //   "16:00": 613,
  //   "16:1 undifferentiated": 626,
  //   "16:1 c": 673,
  //   "16:1 t": 662,
  //   "17:00": 653,
  //   "17:01": 687,
  //   "18:00": 614,
  //   "18:1 undifferentiated": 617,
  //   "18:1 c": 674,
  //   "18:1 t": 663,
  //   "18:1-11t (18:1t n-7)": 859,
  //   "18:2 undifferentiated": 618,
  //   "18:2 CLAs": 670,
  //   "18:2 n-6 c,c": 675,
  //   "18:2 t,t": 669,
  //   "18:3 undifferentiated": 619,
  //   "18:3 n-3 c,c,c (ALA)": 851,
  //   "18:3 n-6 c,c,c": 685,
  //   "18:04": 627,
  //   "20:00": 615,
  //   "20:01": 628,
  //   "20:2 n-6 c,c": 672,
  //   "20:3 undifferentiated": 689,
  //   "20:3 n-3": 852,
  //   "20:3 n-6": 853,
  //   "20:4 undifferentiated": 620,
  //   "20:4 n-6": 855,
  //   "20:5 n-3 (EPA)": 629,
  //   "21:05": 857,
  //   "22:00": 624,
  //   "22:1 undifferentiated": 630,
  //   "22:4": 858,
  //   "22:5 n-3 (DPA)": 631,
  //   "22:6 n-3 (DHA)": 621,
  //   "24:00:00": 654,
  //   "24:1 c": 671,
  //   "4:00": 607,
  //   "6:00": 608,
  //   "8:00": 609,
};

export const nutrientUnits = {
  301: "mg", //Calcium:
  303: "mg", //Iron
  306: "mg", //Potassium
  307: "mg", //Sodium
  539: "g", //Sugars, added
  324: "IU", //Vitamin D
  299: "g", //Sugar Alcohol"
  1001: "g", //Erythritol
  1006: "g", //Allulose
  1002: "g", //Glycerin
  290: "g", //Xylitol
  261: "g", //Sorbitol
  260: "g", //Mannitol
  1003: "g", //Maltitol
  1004: "g", //Isomalt
  1005: "g", //Lactitol
  513: "g", //Alanine
  221: "g", //Alcohol, ethyl
  511: "g", //Arginine
  207: "g", //Ash
  514: "g", //Aspartic acid
  454: "mg", //Betaine
  262: "mg", //Caffeine
  639: "mg", //Campesterol
  322: "Âµg", //Carotene, alpha
  321: "Âµg", //Carotene, beta
  326: "Âµg", //Vitamin D3 (cholecalciferol)
  421: "mg", //Choline, total
  334: "Âµg", //Cryptoxanthin, beta
  312: "mg", //Copper
  507: "g", //Cystine
  325: "Âµg", //Vitamin D2 (ergocalciferol)
  645: "g", //Fatty acids, total monounsaturated
  646: "g", //Fatty acids, total polyunsaturated
  693: "g", //Fatty acids, total trans-monoenoic
  695: "g", //Fatty acids, total trans-polyenoic,
  313: "Âµg", //Fluoride
  417: "Âµg", //Folate, total
  431: "Âµg", //Folic acid
  435: "Âµg", //Folate, DFE
  432: "Âµg", //Folate, food
  212: "g", //Fructose
  287: "g", //Galactose
  515: "g", //Glutamic acid
  211: "g", //Glucose (dextrose)
  516: "g", //Glycine
  512: "g", //Histidine
  521: "g", //Hydroxyproline
  503: "g", //Isoleucine
  213: "g", //Lactose
  504: "g", //Leucine
  338: "Âµg", //Lutein + zeaxanthin
  337: "Âµg", //Lycopene
  505: "g", //Lysine
  214: "g", //Maltose
  506: "g", //Methionine
  304: "mg", //Magnesium
  428: "Âµg", //Menaquinone-4
  315: "mg", //Manganese
  406: "mg", //Niacin
  573: "mg", //Vitamin E, added
  578: "Âµg", //Vitamin B-12, added
  305: "mg", //Phosphorus
  410: "mg", //Pantothenic acid
  508: "g", //Phenylalanine
  636: "mg", //Phytosterols
  517: "g", //Proline
  405: "mg", //Riboflavin
  317: "Âµg", //Selenium
  518: "g", //Serine
  641: "mg", //Beta-sitosterol
  209: "g", //Starch
  638: "mg", //Stigmasterol
  210: "g", //Sucrose
  263: "mg", //Theobromine
  404: "mg", //Thiamin
  502: "g", //Threonine
  323: "mg", //Vitamin E (alpha-tocopherol)
  341: "mg", //Tocopherol, beta
  343: "mg", //Tocopherol, delta
  342: "mg", //Tocopherol, gamma
  501: "g", //Tryptophan
  509: "g", //Tyrosine
  510: "g", //Valine
  318: "IU", //Vitamin A, IU
  320: "Âµg", //Vitamin A, RAE
  418: "Âµg", //Vitamin B-12
  415: "mg", //Vitamin B-6
  401: "mg", //Vitamin C, total ascorbic acid
  328: "Âµg", //Vitamin D (D2 + D3)
  430: "Âµg", //Vitamin K (phylloquinone)
  429: "Âµg", //Dihydrophylloquinone
  255: "g", //Water
  309: "mg", //Zinc
  344: "mg", //Tocotrienol, alpha
  345: "mg", //Tocotrienol, beta
  346: "mg", //Tocotrienol, gamma
  347: "mg", //Tocotrienol, delta
};
export default nutrientWatchListIDs;
