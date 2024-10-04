import { writable, derived } from "svelte/store";

const settings = writable({
    number_of_lines: 36,
    stroke_width: 2,
    arrowheads: true,
    verticalOrientation: false,
    halfCircle: false,
    zoom_size: 3.0,
    log_line_length: [0.0], // the slider component expects to bind to an array
    colors: {start: "#000000", end: "#ffffff", bg: "#000000"}
});

// 5.17006839e+00+0.j,  7.43379412e+00+0.j,  6.16740635e+00+0.j,
// -1.27419819e+01+0.j, -3.27990480e+01+0.j, -7.14464542e+00+0.j,
// -1.15105133e+01+0.j,  2.80345463e+01+0.j, -4.38402762e+01+0.j,
//  2.73104451e+01+0.j,  1.17146225e+02+0.j
const scissors_history = [
    [0, 1], [1, 32.61],
    [0, 1], [1, -71.23],
    [0, 1], [1, -0.58],
    [0, 1], [1, 5.71],
    [0, 1], [1, -26.54],
    [0, 1], [1, 2.53],
    [0, 1], [1, -9.79],
    [0, 1], [1, 0.24],
    [0, 1], [1, -2.65],
    [0, 1], [1, -2.98],
    [0, 1], [1, -1.32],
    [0, -11],
    [0, -1], [1, 117.15],
    [0, -1], [1, 27.31],
    [0, -1], [1, -43.84],
    [0, -1], [1, 28.03],
    [0, -1], [1, -11.51],
    [0, -1], [1, -7.14],
    [0, -1], [1, -32.8],
    [0, -1], [1, -12.74],
    [0, -1], [1, 6.17],
    [0, -1], [1, 7.43],
    [0, -1], [1, 5.17]
]
// const horses_history = [[0, 0], [0, 1], [1, -250.17070583208402], [0, 1], [1, 172.14827119810735], [0, 1], [1, -29.5457770062863], [0, 1], [1, -24.50444363393444], [0, 1], [1, 16.631000539071866], [0, -5], [0, 0], [0, -1], [1, 455.03076999817097], [0, -1], [1, 65.76987772135303], [0, -1], [1, -40.6884336498776], [0, -1], [1, -21.14189252953269], [0, -1], [1, -75.1999309729123], [0, 5], [0, 5], [0, 1], [1, -66.98548224639359], [0, 1], [1, -79.23898820215469], [0, 1], [1, -2.981585021727499], [0, 1], [1, -7.367572822066055], [0, 1], [1, 37.341792652586136], [0, 1], [1, -31.332895789541602], [0, 1], [1, -15.141560472223102], [0, 1], [1, -33.674740192217236], [0, 1], [1, 27.560098518592635], [0, 1], [1, -13.423795665197876], [0, -15], [0, -5], [0, -1], [1, 40.63994292252163], [0, -1], [1, 54.51716775634515], [0, -1], [1, -6.5143786712306255], [0, -1], [1, 28.107271055874246], [0, -1], [1, -22.889208987440355], [0, -1], [1, 7.413766789349041], [0, -1], [1, 4.669358434005505], [0, -1], [1, -10.148051092466421], [0, -1], [1, 0.38537861422431086], [0, -1], [1, 10.062092243313737], [0, 15], [0, 15], [0, 1], [1, -7.686573058368329], [0, 1], [1, -14.98700858652709], [0, 1], [1, -5.400365339539841], [0, 1], [1, 7.2042981688872], [0, 1], [1, -6.792112252556155], [0, 1], [1, 5.438194679251852], [0, 1], [1, -10.22423414549072], [0, 1], [1, 1.9900195736912747], [0, 1], [1, 2.155053397755631], [0, 1], [1, 8.587871574619626], [0, 1], [1, 13.744116072480237], [0, 1], [1, 2.939979064477481], [0, 1], [1, 7.827464443644482], [0, 1], [1, 17.593061137151146], [0, 1], [1, 2.650782057539347], [0, 1], [1, -2.2915810406422157], [0, 1], [1, -1.4771535272623728], [0, 1], [1, -7.959693970747139], [0, 1], [1, -9.135733911051357], [0, 1], [1, 2.4608352932802884], [0, -35], [0, -15], [0, -1], [1, 0.5461892066146832], [0, -1], [1, -1.1256493587489862], [0, -1], [1, 5.456910614334407], [0, -1], [1, 9.862512193864816], [0, -1], [1, -3.8762874679343136], [0, -1], [1, -11.43273175258141], [0, -1], [1, 14.947692864639105], [0, -1], [1, 5.382710512002658], [0, -1], [1, 6.68627192586241], [0, -1], [1, 2.8841303598481867], [0, -1], [1, 11.558170924017052], [0, -1], [1, -6.992750401272906], [0, -1], [1, -3.8010477778918266], [0, -1], [1, 5.564924694320299], [0, -1], [1, -6.514209332670464], [0, -1], [1, -8.889018903573877], [0, -1], [1, -1.965740043063473], [0, -1], [1, 1.5613626703152799], [0, -1], [1, -6.891226092505836], [0, -1], [1, 4.445480310423179], [0, 35]]
const horses_history = [[0, 0], [0, 1], [1, -250.17070583208402], [0, 1], [1, 172.14827119810735], [0, 1], [1, -29.5457770062863], [0, 1], [1, -24.50444363393444], [0, 1], [1, 16.631000539071866], [0, -5], [0, 0], [0, -1], [1, 455.03076999817097], [0, -1], [1, 65.76987772135303], [0, -1], [1, -40.6884336498776], [0, -1], [1, -21.14189252953269], [0, -1], [1, -75.1999309729123], [0, 5], [0, 5], [0, 1], [1, -66.98548224639359], [0, 1], [1, -79.23898820215469], [0, 1], [1, -2.981585021727499], [0, 1], [1, -7.367572822066055], [0, 1], [1, 37.341792652586136], [0, 1], [1, -31.332895789541602], [0, 1], [1, -15.141560472223102], [0, 1], [1, -33.674740192217236], [0, 1], [1, 27.560098518592635], [0, 1], [1, -13.423795665197876], [0, -15], [0, -5], [0, -1], [1, 40.63994292252163], [0, -1], [1, 54.51716775634515], [0, -1], [1, -6.5143786712306255], [0, -1], [1, 28.107271055874246], [0, -1], [1, -22.889208987440355], [0, -1], [1, 7.413766789349041], [0, -1], [1, 4.669358434005505], [0, -1], [1, -10.148051092466421], [0, -1], [1, 0.38537861422431086], [0, -1], [1, 10.062092243313737], [0, 15], [0, 15], [0, 1], [1, -7.686573058368329], [0, 1], [1, -14.98700858652709], [0, 1], [1, -5.400365339539841], [0, 1], [1, 7.2042981688872], [0, 1], [1, -6.792112252556155], [0, 1], [1, 5.438194679251852], [0, 1], [1, -10.22423414549072], [0, 1], [1, 1.9900195736912747], [0, 1], [1, 2.155053397755631], [0, 1], [1, 8.587871574619626], [0, 1], [1, 13.744116072480237], [0, 1], [1, 2.939979064477481], [0, 1], [1, 7.827464443644482], [0, 1], [1, 17.593061137151146], [0, 1], [1, 2.650782057539347], [0, 1], [1, -2.2915810406422157], [0, 1], [1, -1.4771535272623728], [0, 1], [1, -7.959693970747139], [0, 1], [1, -9.135733911051357], [0, 1], [1, 2.4608352932802884], [0, -35], [0, -15], [0, -1], [1, 0.5461892066146832], [0, -1], [1, -1.1256493587489862], [0, -1], [1, 5.456910614334407], [0, -1], [1, 9.862512193864816], [0, -1], [1, -3.8762874679343136], [0, -1], [1, -11.43273175258141], [0, -1], [1, 14.947692864639105], [0, -1], [1, 5.382710512002658], [0, -1], [1, 6.68627192586241], [0, -1], [1, 2.8841303598481867], [0, -1], [1, 11.558170924017052], [0, -1], [1, -6.992750401272906], [0, -1], [1, -3.8010477778918266], [0, -1], [1, 5.564924694320299], [0, -1], [1, -6.514209332670464], [0, -1], [1, -8.889018903573877], [0, -1], [1, -1.965740043063473], [0, -1], [1, 1.5613626703152799], [0, -1], [1, -6.891226092505836], [0, -1], [1, 4.445480310423179], [0, 35], [0, 35], [0, 1], [1, -5.724279389291224], [0, 1], [1, 2.7364044151846207], [0, 1], [1, 4.851947124847992], [0, 1], [1, -3.7693961927631205], [0, 1], [1, 4.3964151509425555], [0, 1], [1, 5.592053019222088], [0, 1], [1, -3.0718979633093397], [0, 1], [1, -6.9262764926674745], [0, 1], [1, 0.5626934496223768], [0, 1], [1, -1.5957510172954463], [0, 1], [1, 2.299995309350725], [0, 1], [1, -2.647336006947053], [0, 1], [1, 0.8295367806989897], [0, 1], [1, 4.598040971715832], [0, 1], [1, -0.8308973922546434], [0, 1], [1, -1.6304008917077004], [0, 1], [1, -0.9314073330216782], [0, 1], [1, -1.2046248954585146], [0, 1], [1, -2.2300225618215492], [0, 1], [1, -0.07957730347327838], [0, 1], [1, -3.903460032137203], [0, 1], [1, 3.642792980264603], [0, 1], [1, -0.8432627233321973], [0, 1], [1, -1.8853133598792802], [0, 1], [1, -1.019351777641858], [0, 1], [1, 0.4345977264523868], [0, 1], [1, 0.34200694803294046], [0, 1], [1, 1.3488294356240562], [0, 1], [1, -2.3536047529633395], [0, 1], [1, 0.07584210696779968], [0, 1], [1, 1.01358369700626], [0, 1], [1, -1.1543147282938537], [0, 1], [1, 0.8846680726468916], [0, 1], [1, 0.08919896189160853], [0, 1], [1, -1.5784391373322193], [0, 1], [1, 0.034016312602039446], [0, 1], [1, 1.0279846371656998], [0, 1], [1, 0.48763027939980147], [0, 1], [1, 0.2882307260456934], [0, 1], [1, 0.8271373166545317], [0, -75], [0, -35], [0, -1], [1, 2.715280934090397], [0, -1], [1, -0.04247944061582075], [0, -1], [1, -2.2916690444530428], [0, -1], [1, 3.7118887023718443], [0, -1], [1, 2.038353765726753], [0, -1], [1, -1.0056515918669877], [0, -1], [1, -1.529974585932953], [0, -1], [1, -0.34450665207348696], [0, -1], [1, 6.23377262754803], [0, -1], [1, -2.0574726861142496], [0, -1], [1, -2.0565696790385593], [0, -1], [1, 3.180454540368318], [0, -1], [1, 0.643992629295929], [0, -1], [1, -1.7055298781603785], [0, -1], [1, -1.2436981756798038], [0, -1], [1, 1.1631595954496559], [0, -1], [1, -1.216505007397205], [0, -1], [1, -0.19340953994395355], [0, -1], [1, -1.9123522712582428], [0, -1], [1, -0.7765627417772907], [0, -1], [1, 1.534303150016381], [0, -1], [1, 2.248512937296117], [0, -1], [1, -1.1867304500301343], [0, -1], [1, -1.202023998496583], [0, -1], [1, 1.5660703077763076], [0, -1], [1, -0.09055544135326571], [0, -1], [1, -0.7449421798841869], [0, -1], [1, 1.2535706924763539], [0, -1], [1, -0.6907084534498009], [0, -1], [1, -0.4022668747726271], [0, -1], [1, -0.08911189955906187], [0, -1], [1, 0.46407924122737526], [0, -1], [1, -1.1143522950091758], [0, -1], [1, -0.9884766476236577], [0, -1], [1, 0.5844942095601238], [0, -1], [1, -0.9094293077178373], [0, -1], [1, -0.3252190211148009], [0, -1], [1, 1.219636822617344], [0, -1], [1, 0.19772663270291027], [0, -1], [1, -1.0460475389667157], [0, 75], [0, 75], [0, 1], [1, -0.5934177853044367], [0, 1], [1, 0.5042383385413012], [0, 1], [1, 0.6922651259485102], [0, 1], [1, -0.5075634776093806], [0, 1], [1, -0.7489230672009783], [0, 1], [1, -0.8811679034789917], [0, 1], [1, -0.5258450214847733], [0, 1], [1, -0.8067954133562596], [0, 1], [1, 0.07603292282523195], [0, 1], [1, -0.9485318396209113], [0, 1], [1, -0.46309427307448386], [0, 1], [1, 0.13058005609631246], [0, 1], [1, -0.4608894484161852], [0, 1], [1, -0.030474530208695394], [0, 1], [1, 0.40540019369977565], [0, 1], [1, 1.5769622698631671], [0, 1], [1, -0.7490818072375723], [0, 1], [1, 1.6928635629729376], [0, 1], [1, 0.5534228975996471], [0, 1], [1, 0.30840266327553617], [0, 1], [1, -0.0917106944526066], [0, 1], [1, -0.8545135422820983], [0, 1], [1, -0.34989651143040407], [0, 1], [1, -0.23017024313224616], [0, 1], [1, -0.005201547556364705], [0, 1], [1, -0.23211204296138632], [0, 1], [1, 0.3983989206989895], [0, 1], [1, -0.4700739955730159], [0, 1], [1, -0.11046088084709382], [0, 1], [1, -0.06494784104297435], [0, 1], [1, -0.2547986977004316], [0, 1], [1, -0.012111367833148298], [0, 1], [1, -0.9576018307639894], [0, 1], [1, -0.0925974932747542], [0, 1], [1, 0.7175261468183837], [0, 1], [1, 0.7232989857195673], [0, 1], [1, 0.1725368384195962], [0, 1], [1, 0.5929513182672477], [0, 1], [1, 0.5026640622864744], [0, 1], [1, 0.5106101810191372], [0, 1], [1, 0.008244004998721355], [0, 1], [1, -0.27948611384484], [0, 1], [1, -0.19020712808769025], [0, 1], [1, -0.2596169045903983], [0, 1], [1, -0.2950420595784836], [0, 1], [1, 0.020525269663947077], [0, 1], [1, 0.0984996616868612], [0, 1], [1, 0.1790911363948045], [0, 1], [1, -0.1987329813215548], [0, 1], [1, 0.11526639668181482], [0, 1], [1, -0.0895490593411874], [0, 1], [1, 0.21925484061987544], [0, 1], [1, -0.5565397044046188], [0, 1], [1, -0.19777682206279845], [0, 1], [1, 0.18255034731527342], [0, 1], [1, -0.15283011577019745], [0, 1], [1, -0.12522034249903147], [0, 1], [1, -0.023758245727032], [0, 1], [1, -0.12095392637951141], [0, 1], [1, -0.48211131026043663], [0, 1], [1, 0.010791904681614284], [0, 1], [1, -0.14813146185885007], [0, 1], [1, 0.10084601842894347], [0, 1], [1, 0.2157662258158095], [0, 1], [1, -0.02823394764913356], [0, 1], [1, 0.01101839418606465], [0, 1], [1, 0.1216657846739464], [0, 1], [1, 0.13828745642411466], [0, 1], [1, -0.10207711662389189], [0, 1], [1, 0.14798759822251828], [0, 1], [1, -0.09367760820585597], [0, 1], [1, 0.06244946436007437], [0, 1], [1, -0.02729242724428449], [0, 1], [1, 0.0071434159371972505], [0, 1], [1, -0.16917662887682372], [0, 1], [1, -0.07738240481659808], [0, 1], [1, -0.1071632842366701], [0, 1], [1, -0.1923437876902767], [0, 1], [1, -0.026087550868002296], [0, 1], [1, -0.1526253379804814], [0, -155], [0, -75], [0, -1], [1, 0.33435595883030245], [0, -1], [1, 0.4023827340816547], [0, -1], [1, -0.7489264523526448], [0, -1], [1, -0.3508778138237212], [0, -1], [1, 0.11597768144070411], [0, -1], [1, -0.16405530936846388], [0, -1], [1, -0.18538998195179845], [0, -1], [1, -0.3310416284551884], [0, -1], [1, -0.9137910919288282], [0, -1], [1, -0.2515287329585487], [0, -1], [1, 0.7169064207768658], [0, -1], [1, -0.32635506925519586], [0, -1], [1, -0.15048515752841268], [0, -1], [1, 0.14600314637748185], [0, -1], [1, 0.4988656816093803], [0, -1], [1, 0.261285629886], [0, -1], [1, -0.539521095216587], [0, -1], [1, 0.46809877602769223], [0, -1], [1, 0.6411831865901549], [0, -1], [1, 0.049872720336857454], [0, -1], [1, 0.3184597739223912], [0, -1], [1, 0.26113326389101155], [0, -1], [1, -0.2817870047096578], [0, -1], [1, 0.8327981623141971], [0, -1], [1, -0.005472695734488992], [0, -1], [1, -0.05776383248267603], [0, -1], [1, 0.19954733835730004], [0, -1], [1, 0.19518345617147936], [0, -1], [1, -0.27297695196353433], [0, -1], [1, -0.34207611866750076], [0, -1], [1, 0.10052264861004337], [0, -1], [1, -0.06956567634739565], [0, -1], [1, 0.037512373713915415], [0, -1], [1, -0.10335413416631668], [0, -1], [1, 0.2600687085439378], [0, -1], [1, 0.21846328393810008], [0, -1], [1, -0.08804940665405762], [0, -1], [1, 0.008293459061501085], [0, -1], [1, 0.20679404930446488], [0, -1], [1, -0.1826093367900371], [0, -1], [1, -0.07399620766893372], [0, -1], [1, 0.057176515029608896], [0, -1], [1, -0.10714830553800128], [0, -1], [1, 0.05394906692440577], [0, -1], [1, 0.2790628146870069], [0, -1], [1, -0.06132974814814575], [0, -1], [1, -0.18551766881602072], [0, -1], [1, 0.342258129496717], [0, -1], [1, 0.1491286372063643], [0, -1], [1, -0.04034448573141458], [0, -1], [1, 0.07621770050894233], [0, -1], [1, -0.0020331628797835843], [0, -1], [1, 0.18873426248965783], [0, -1], [1, -0.10092088153670101], [0, -1], [1, -0.07711198878392825], [0, -1], [1, 0.08731162520352785], [0, -1], [1, 0.059910292214412984], [0, -1], [1, 0.07258299025153106], [0, -1], [1, 0.07406466315652777], [0, -1], [1, 0.00752188057401678], [0, -1], [1, -0.10409431675049259], [0, -1], [1, 0.0025341887751385156], [0, -1], [1, -0.06698977719492198], [0, -1], [1, -0.16020365866044636], [0, -1], [1, 0.038895399465748576], [0, -1], [1, 0.023825291574650645], [0, -1], [1, 0.0029001578283420915], [0, -1], [1, -0.11396575705478557], [0, -1], [1, 0.05073823341379723], [0, -1], [1, 0.18577302469667475], [0, -1], [1, -0.005914746267328866], [0, -1], [1, -0.026212857552134594], [0, -1], [1, 0.12683138280835854], [0, -1], [1, 0.04241550760922998], [0, -1], [1, -0.128891409175977], [0, -1], [1, 0.015227309300929782], [0, -1], [1, 0.026849509042490477], [0, -1], [1, -0.038467816738845674], [0, -1], [1, 0.1168775829064732], [0, -1], [1, 0.03602901219365866], [0, 155]]
const woman_head_history = [[0, 0], [0, 1], [1, -487.7925734356406], [0, 1], [1, -102.1212548376019], [0, 1], [1, -24.241864168238912], [0, 1], [1, 14.177798489287424], [0, 1], [1, -1.1727316005314172], [0, -5], [0, 0], [0, -1], [1, 237.5026561333077], [0, -1], [1, 59.18196913876104], [0, -1], [1, 24.678514800799434], [0, -1], [1, -24.53645343747729], [0, -1], [1, 43.92450182809731], [0, 5], [0, 5], [0, 1], [1, 67.55479529582023], [0, 1], [1, -45.40433493843842], [0, 1], [1, 62.23732067424212], [0, 1], [1, -37.574796814658654], [0, 1], [1, -56.874363337429145], [0, 1], [1, -4.713693065174885], [0, 1], [1, 23.88506954719332], [0, 1], [1, 11.334764254148757], [0, 1], [1, -36.58711027833097], [0, 1], [1, -33.637200858925], [0, -15], [0, -5], [0, -1], [1, -12.813170424106495], [0, -1], [1, -4.860191185567986], [0, -1], [1, 22.718238588278417], [0, -1], [1, -37.422029503032725], [0, -1], [1, 2.5992793080845287], [0, -1], [1, -7.096605999618403], [0, -1], [1, 32.22169219133292], [0, -1], [1, -27.628668444523562], [0, -1], [1, -17.40571576206469], [0, -1], [1, -13.174758492054995], [0, 15], [0, 15], [0, 1], [1, 7.7541636670296095], [0, 1], [1, -4.66079826049871], [0, 1], [1, 11.114173730790306], [0, 1], [1, -12.186422534555124], [0, 1], [1, -7.298019276683027], [0, 1], [1, -3.842217224735783], [0, 1], [1, -12.890067956613183], [0, 1], [1, -9.46908693164275], [0, 1], [1, 2.0274458601238634], [0, 1], [1, -4.419144884591812], [0, 1], [1, 7.779715741141305], [0, 1], [1, -3.0055592449044375], [0, 1], [1, 8.913958606667276], [0, 1], [1, -0.21238350913138904], [0, 1], [1, -10.655718328661221], [0, 1], [1, 3.8233255144663847], [0, 1], [1, -8.029527644169708], [0, 1], [1, -3.9381136120392872], [0, 1], [1, 3.3705974561060987], [0, 1], [1, 1.0737348992446765], [0, -35], [0, -15], [0, -1], [1, -1.7871555020720171], [0, -1], [1, -6.796456725647943], [0, -1], [1, 1.135247256921038], [0, -1], [1, 6.990535202373117], [0, -1], [1, -11.60374062900197], [0, -1], [1, -7.407907395377304], [0, -1], [1, 6.474628472145547], [0, -1], [1, 4.7483990113819665], [0, -1], [1, -7.8838393303920355], [0, -1], [1, 2.3403896820369754], [0, -1], [1, 5.64337588225638], [0, -1], [1, 1.8761259654748699], [0, -1], [1, -2.0298021465769995], [0, -1], [1, 3.4089810615680056], [0, -1], [1, 1.4093269960287977], [0, -1], [1, 0.5659905427085177], [0, -1], [1, -0.030170950323133446], [0, -1], [1, 4.141175300688071], [0, -1], [1, 0.17259356460796832], [0, -1], [1, -4.628705778519808], [0, 35], [0, 35], [0, 1], [1, 4.053991174061084], [0, 1], [1, 7.381647295670873], [0, 1], [1, -7.386645157684251], [0, 1], [1, -9.421567464193526], [0, 1], [1, 6.5871746800500155], [0, 1], [1, -4.027780472963027], [0, 1], [1, 5.541270840887447], [0, 1], [1, 6.640361781417749], [0, 1], [1, 1.6467883693365937], [0, 1], [1, 0.30777242416126516], [0, 1], [1, -0.6784329138499644], [0, 1], [1, 1.3207348210662602], [0, 1], [1, -1.7558820780339925], [0, 1], [1, -1.4105246379861702], [0, 1], [1, -4.397674850526197], [0, 1], [1, 0.6833398113662295], [0, 1], [1, -2.3299844839918666], [0, 1], [1, -4.028058764558663], [0, 1], [1, 1.2063728196047585], [0, 1], [1, -3.1990602520549962], [0, 1], [1, -1.504753944494683], [0, 1], [1, -2.3110475941836324], [0, 1], [1, -0.4318681630617542], [0, 1], [1, 0.032065270671027934], [0, 1], [1, 2.637441845251004], [0, 1], [1, 2.2791070619439893], [0, 1], [1, 0.0341880342015187], [0, 1], [1, 1.8600986395685881], [0, 1], [1, 1.1032415750167992], [0, 1], [1, 0.5321649302399973], [0, 1], [1, -1.0409403087057962], [0, 1], [1, 1.1391982848537832], [0, 1], [1, -2.5490095392891465], [0, 1], [1, -1.1381255245747115], [0, 1], [1, 2.1690354521036617], [0, 1], [1, -0.1017605097075789], [0, 1], [1, 0.3554553902591189], [0, 1], [1, 1.402445562386839], [0, 1], [1, 0.3042212175764627], [0, 1], [1, 1.994875442059127], [0, -75], [0, -35], [0, -1], [1, 2.426588390806389], [0, -1], [1, -4.975477128030315], [0, -1], [1, -0.640463861175132], [0, -1], [1, -1.285939369988475], [0, -1], [1, 0.16070629752039584], [0, -1], [1, 0.7869288636601417], [0, -1], [1, -0.10760707238727331], [0, -1], [1, 2.2052999070567942], [0, -1], [1, -1.064713743320831], [0, -1], [1, 3.1470605385318677], [0, -1], [1, 0.7350679355604349], [0, -1], [1, 0.0978813849163571], [0, -1], [1, -2.9413999736701415], [0, -1], [1, 0.5147521477379304], [0, -1], [1, 2.8622063000033315], [0, -1], [1, -0.34573686187312025], [0, -1], [1, 4.149993419464255], [0, -1], [1, 0.09710678239252474], [0, -1], [1, -1.5975562798634224], [0, -1], [1, -0.8493321375083145], [0, -1], [1, -0.043875092430133114], [0, -1], [1, 0.6586373586284836], [0, -1], [1, -1.7524656819676574], [0, -1], [1, 0.03366352453085049], [0, -1], [1, -1.337135343766954], [0, -1], [1, 0.7667553883505185], [0, -1], [1, -1.1142221804012429], [0, -1], [1, -0.4021243790096365], [0, -1], [1, 0.02711478760810589], [0, -1], [1, -1.009516906533364], [0, -1], [1, 1.0677706241345657], [0, -1], [1, -0.4564748714760941], [0, -1], [1, -0.12380979294694354], [0, -1], [1, -0.26419361008834674], [0, -1], [1, -0.030523209975986957], [0, -1], [1, 0.27318984474538877], [0, -1], [1, 0.24624448434532953], [0, -1], [1, -0.06289184747143484], [0, -1], [1, 0.016994493311227606], [0, -1], [1, 0.4372432066612736], [0, 75], [0, 75], [0, 1], [1, 1.6097032775758247], [0, 1], [1, -0.3887817569509791], [0, 1], [1, 0.19720574969952592], [0, 1], [1, -0.39864220487468355], [0, 1], [1, -1.4376123701106245], [0, 1], [1, -0.283848760655345], [0, 1], [1, -1.1164919263833337], [0, 1], [1, -1.4989991364665478], [0, 1], [1, -0.8028724222971065], [0, 1], [1, -0.6211471447504028], [0, 1], [1, 0.11753935857829957], [0, 1], [1, 0.43082871348691415], [0, 1], [1, 0.0912098542988862], [0, 1], [1, 0.6938184592057336], [0, 1], [1, 0.1867256510714531], [0, 1], [1, -0.6551974812347823], [0, 1], [1, -1.379785612049027], [0, 1], [1, -0.8571091159509816], [0, 1], [1, -0.516655192799854], [0, 1], [1, -0.46668060249798493], [0, 1], [1, -0.06189517136942004], [0, 1], [1, 0.2162279643706356], [0, 1], [1, 0.099817711844854], [0, 1], [1, 0.6251970040239472], [0, 1], [1, 0.759027810273119], [0, 1], [1, -0.21481515334845844], [0, 1], [1, -0.24436550432701426], [0, 1], [1, 0.3587362978866052], [0, 1], [1, -0.21025208741735513], [0, 1], [1, 0.9000751153005295], [0, 1], [1, 0.6903428508696065], [0, 1], [1, -0.24405354037127122], [0, 1], [1, 0.032375076283096105], [0, 1], [1, 0.12834264284915659], [0, 1], [1, 0.09524335714954413], [0, 1], [1, 0.10469941458002391], [0, 1], [1, 0.09234802521655572], [0, 1], [1, -0.28439810088399753], [0, 1], [1, 0.11074106525430416], [0, 1], [1, -0.41521423279656855], [0, 1], [1, -0.33784147153444605], [0, 1], [1, -0.14525915385904553], [0, 1], [1, -0.3447712134242516], [0, 1], [1, -0.08169192135804643], [0, 1], [1, -0.019995234921003566], [0, 1], [1, 0.08244508386177013], [0, 1], [1, -0.011259487528524209], [0, 1], [1, 0.041225672395055035], [0, 1], [1, -0.0866523356942338], [0, 1], [1, -0.2689021279257746], [0, 1], [1, -0.6189758198711666], [0, 1], [1, -0.2813460512351562], [0, 1], [1, -0.34165779402755947], [0, 1], [1, -0.1323805724344586], [0, 1], [1, 0.002988277222304603], [0, 1], [1, -0.1272336476927165], [0, 1], [1, 0.10129219118720789], [0, 1], [1, 0.20581043367731], [0, 1], [1, 0.4174545465040944], [0, 1], [1, 0.2943747958953026], [0, 1], [1, 0.25399575431743493], [0, 1], [1, 0.15580289632632338], [0, 1], [1, 0.13595966974599882], [0, 1], [1, 0.03460585964054719], [0, 1], [1, -0.12516892475137542], [0, 1], [1, 0.013452800599508485], [0, 1], [1, -0.3866469137752594], [0, 1], [1, -0.1389508500345893], [0, 1], [1, -0.08107625707968213], [0, 1], [1, -0.1414466104668719], [0, 1], [1, 0.02709528151885543], [0, 1], [1, 0.11008184537623933], [0, 1], [1, 0.14473401397345853], [0, 1], [1, -0.06628156762661419], [0, 1], [1, -0.06561907495720065], [0, 1], [1, -0.2202233380902321], [0, 1], [1, -0.16590945444678162], [0, 1], [1, -0.20056000414691333], [0, 1], [1, -0.2304197863872801], [0, 1], [1, -0.1306214707819766], [0, -155], [0, -75], [0, -1], [1, 0.40113850452088745], [0, -1], [1, 0.23343349886284218], [0, -1], [1, 0.5093447888461826], [0, -1], [1, -0.44697079356823954], [0, -1], [1, -0.5208637717790023], [0, -1], [1, -0.3056511077206454], [0, -1], [1, -0.40137465444662634], [0, -1], [1, -0.9882624354951246], [0, -1], [1, -0.30774548352250797], [0, -1], [1, 0.8601023040722531], [0, -1], [1, -0.062261541212141044], [0, -1], [1, -0.06612459435100963], [0, -1], [1, 1.0121741089829546], [0, -1], [1, -0.07320264201829466], [0, -1], [1, 0.1572405460752749], [0, -1], [1, 0.3538024014842881], [0, -1], [1, 0.33779530013846737], [0, -1], [1, -0.49480181064564527], [0, -1], [1, -0.23145193418241322], [0, -1], [1, 0.27114814317814284], [0, -1], [1, -0.4553953637035047], [0, -1], [1, -0.13549198717369548], [0, -1], [1, 0.23380328898002706], [0, -1], [1, 0.24897747228003608], [0, -1], [1, -0.2623958337020183], [0, -1], [1, 0.3186786559593064], [0, -1], [1, 0.24166909967107014], [0, -1], [1, -0.762518083208388], [0, -1], [1, 0.25888392309850494], [0, -1], [1, 0.14368877450935036], [0, -1], [1, -0.08163642247930009], [0, -1], [1, -0.15105759271452612], [0, -1], [1, 0.6288741333459303], [0, -1], [1, -0.13128933965883283], [0, -1], [1, -0.3149927032413936], [0, -1], [1, -0.23182320913039442], [0, -1], [1, -0.2160207294595949], [0, -1], [1, -0.37578211874347334], [0, -1], [1, -0.1986697213427203], [0, -1], [1, 0.3328867655201283], [0, -1], [1, 0.12564661136802746], [0, -1], [1, 0.12379206632259684], [0, -1], [1, 0.2958349126081087], [0, -1], [1, 0.4735285405017642], [0, -1], [1, -0.0308163269106294], [0, -1], [1, 0.15101499648260083], [0, -1], [1, 0.05622352055999862], [0, -1], [1, -0.06244746346964242], [0, -1], [1, -0.08971710141883239], [0, -1], [1, -0.24763592223328051], [0, -1], [1, -0.29483351248964007], [0, -1], [1, -0.603945775314134], [0, -1], [1, 0.0027532274298905854], [0, -1], [1, -0.32101853411422027], [0, -1], [1, -0.08189495777635805], [0, -1], [1, 0.030034883609672616], [0, -1], [1, 0.19234928092768], [0, -1], [1, 0.0736998793116602], [0, -1], [1, 0.18800216627852007], [0, -1], [1, 0.060496549752416987], [0, -1], [1, -0.2929471572561543], [0, -1], [1, 0.10402815245164657], [0, -1], [1, 0.02186510925998897], [0, -1], [1, 0.023116225674874587], [0, -1], [1, 0.1817068567526528], [0, -1], [1, -0.03311486915286152], [0, -1], [1, 0.01770429608300461], [0, -1], [1, -0.05215715052503227], [0, -1], [1, 0.14765499150874156], [0, -1], [1, -0.1418737743451386], [0, -1], [1, -0.015015091346005975], [0, -1], [1, -0.018614373111692853], [0, -1], [1, 0.056550268058182945], [0, -1], [1, 0.02511428413615105], [0, -1], [1, -0.013624383850987187], [0, -1], [1, 0.10375112550731497], [0, -1], [1, -0.047455110241572104], [0, -1], [1, -0.039971400982307795], [0, -1], [1, 0.05700293261231322], [0, -1], [1, -0.006734952995299026], [0, 155]]
const word_gordian_history =[[0, 0], [0, 1], [1, -307.27345750331403], [0, 1], [1, -31.626155146830452], [0, 1], [1, 33.6002324262725], [0, 1], [1, 21.667291237376332], [0, 1], [1, 66.93280113112077], [0, -5], [0, 0], [0, -1], [1, -989.602761134426], [0, -1], [1, 76.40242199432052], [0, -1], [1, -116.30675817963625], [0, -1], [1, 21.31191593059344], [0, -1], [1, -109.99360240391294], [0, 5], [0, 5], [0, 1], [1, -5.556304396508623], [0, 1], [1, 49.26542384658319], [0, 1], [1, 9.380776016699201], [0, 1], [1, -16.945533801239154], [0, 1], [1, -44.070698994861836], [0, 1], [1, 16.778570730778533], [0, 1], [1, -38.711731024213265], [0, 1], [1, 25.15862648389578], [0, 1], [1, 31.454710168949013], [0, 1], [1, -13.89734111113678], [0, -15], [0, -5], [0, -1], [1, -43.56993663863324], [0, -1], [1, -96.5702776425749], [0, -1], [1, -25.52888123743443], [0, -1], [1, -34.676586737057], [0, -1], [1, -20.450963846802278], [0, -1], [1, -14.555164367925805], [0, -1], [1, -1.970439386498977], [0, -1], [1, -9.36547552883174], [0, -1], [1, -63.017620691703975], [0, -1], [1, -74.18313865392116], [0, 15], [0, 15], [0, 1], [1, -20.163889993165185], [0, 1], [1, 11.74797746887018], [0, 1], [1, -5.863614938011116], [0, 1], [1, -23.69378992869531], [0, 1], [1, 1.9832186753364909], [0, 1], [1, 36.33636640667714], [0, 1], [1, -11.533826200729749], [0, 1], [1, -18.053538681995665], [0, 1], [1, 25.576020390705445], [0, 1], [1, 15.881004636684189], [0, 1], [1, -17.78888730667598], [0, 1], [1, -0.0026665193642188], [0, 1], [1, 5.891427111781661], [0, 1], [1, -10.890603892904752], [0, 1], [1, 10.914976303248192], [0, 1], [1, -6.30772919051509], [0, 1], [1, -2.7182412051401577], [0, 1], [1, 8.070346398297987], [0, 1], [1, -11.079224277872028], [0, 1], [1, 0.7887929762129908], [0, -35], [0, -15], [0, -1], [1, -31.87929793650037], [0, -1], [1, -36.81857028574889], [0, -1], [1, -1.292593431051916], [0, -1], [1, 80.38666033776082], [0, -1], [1, 29.29215755029672], [0, -1], [1, 26.540949697443743], [0, -1], [1, -27.695885281150247], [0, -1], [1, 20.858325867751184], [0, -1], [1, 28.231415394508538], [0, -1], [1, 6.525158955269457], [0, -1], [1, -8.736307734823178], [0, -1], [1, -16.433983106740882], [0, -1], [1, -26.27029982462622], [0, -1], [1, 33.89663917351409], [0, -1], [1, -19.013812891256627], [0, -1], [1, -7.650422933209106], [0, -1], [1, 5.785590337974153], [0, -1], [1, -19.782315801257397], [0, -1], [1, 10.977585645903794], [0, -1], [1, -13.353502743240835], [0, 35], [0, 35], [0, 1], [1, 6.038985808462087], [0, 1], [1, 3.9856223354804485], [0, 1], [1, -14.198509072644761], [0, 1], [1, 12.591214805022075], [0, 1], [1, 1.2505136463967277], [0, 1], [1, -4.022450675299452], [0, 1], [1, 1.0720790930723967], [0, 1], [1, -7.671867096280582], [0, 1], [1, 9.355956063954384], [0, 1], [1, 0.43493500503104476], [0, 1], [1, -5.354523141511815], [0, 1], [1, -1.652370714060856], [0, 1], [1, 6.676550276189631], [0, 1], [1, -1.820863665152903], [0, 1], [1, -1.8602345714755308], [0, 1], [1, 3.366800637133232], [0, 1], [1, -5.664014265710139], [0, 1], [1, 1.7339334497180274], [0, 1], [1, 2.9509696846502735], [0, 1], [1, -2.4789655359294906], [0, 1], [1, 1.068527806484216], [0, 1], [1, 0.06557005227402701], [0, 1], [1, 2.536685160337637], [0, 1], [1, -0.1391148250200014], [0, 1], [1, 0.049045367970851766], [0, 1], [1, -0.8126759709681447], [0, 1], [1, -0.8021561675488392], [0, 1], [1, 0.13288135355080655], [0, 1], [1, 1.83346667435627], [0, 1], [1, -2.186867585763157], [0, 1], [1, -0.1515854215933875], [0, 1], [1, -1.337226735582051], [0, 1], [1, 2.3319704793367064], [0, 1], [1, -2.7861189998785525], [0, 1], [1, 1.7317206697016014], [0, 1], [1, -1.6269425756902511], [0, 1], [1, 0.394917269638041], [0, 1], [1, 1.1317736840333514], [0, 1], [1, -0.4751067090703853], [0, 1], [1, -0.6002926886463184], [0, -75], [0, -35], [0, -1], [1, 16.186253737315774], [0, -1], [1, 5.083927957368287], [0, -1], [1, 3.998905398978083], [0, -1], [1, -4.681894594872167], [0, -1], [1, -7.076741133110091], [0, -1], [1, 0.6882858565621266], [0, -1], [1, -0.012507604722199916], [0, -1], [1, 7.343365710078167], [0, -1], [1, -3.2575030725286807], [0, -1], [1, 2.01542009897918], [0, -1], [1, -0.7865281853329121], [0, -1], [1, 5.158102300209913], [0, -1], [1, -0.5256580748350863], [0, -1], [1, -2.6729410309135355], [0, -1], [1, -2.118731918836901], [0, -1], [1, -2.9658569856236734], [0, -1], [1, 5.1656545671586915], [0, -1], [1, 1.6506991196239418], [0, -1], [1, -2.4740034640728754], [0, -1], [1, -2.172505510832899], [0, -1], [1, 3.671121832694078], [0, -1], [1, -2.3103861494766256], [0, -1], [1, -2.7350245950699783], [0, -1], [1, -2.9712834338088743], [0, -1], [1, -1.2936651411930085], [0, -1], [1, 2.145108992319038], [0, -1], [1, 1.9143218669540585], [0, -1], [1, -0.5945706852136105], [0, -1], [1, 0.762525856504195], [0, -1], [1, -0.18590972273112402], [0, -1], [1, 0.8902230997714001], [0, -1], [1, 0.36704476519934437], [0, -1], [1, 1.6928387752333736], [0, -1], [1, 0.6204201780335052], [0, -1], [1, 2.441936310680168], [0, -1], [1, -3.045263832576846], [0, -1], [1, 0.18683748694285784], [0, -1], [1, 0.05059118306722547], [0, -1], [1, -1.5638818001874413], [0, -1], [1, -0.9370923383922063], [0, 75], [0, 75], [0, 1], [1, 0.07374034102340765], [0, 1], [1, 1.0778663435044937], [0, 1], [1, 0.30272250895959224], [0, 1], [1, -1.1322559532468561], [0, 1], [1, 1.1991562899528148], [0, 1], [1, -0.32284914879423576], [0, 1], [1, -0.26690255519947526], [0, 1], [1, -1.1379430929648007], [0, 1], [1, 1.172380089483808], [0, 1], [1, -0.2701783309918363], [0, 1], [1, -0.25649326106396164], [0, 1], [1, -1.1986001629305842], [0, 1], [1, 0.5843850594869949], [0, 1], [1, 0.14021472679403668], [0, 1], [1, 0.17315666128355656], [0, 1], [1, -0.08627664769081753], [0, 1], [1, -0.02453254496177637], [0, 1], [1, -0.30201950900670055], [0, 1], [1, 0.6101050380188386], [0, 1], [1, -1.2261289811721219], [0, 1], [1, 0.05131382109186999], [0, 1], [1, -0.20633834464816858], [0, 1], [1, 0.9202733536007563], [0, 1], [1, -0.9914072823687285], [0, 1], [1, 0.3714987700103145], [0, 1], [1, 0.7091166641658767], [0, 1], [1, -0.3815808816064954], [0, 1], [1, 0.12770551997083168], [0, 1], [1, 0.978278641260321], [0, 1], [1, -0.5600210999666873], [0, 1], [1, -0.38904238747324427], [0, 1], [1, -0.047085195911811484], [0, 1], [1, 0.8878414010747617], [0, 1], [1, -0.8794216338788097], [0, 1], [1, 0.35795840707948046], [0, 1], [1, -1.0683903123142846], [0, 1], [1, 0.5651503632944622], [0, 1], [1, 0.4865226171890331], [0, 1], [1, -0.2040146653930941], [0, 1], [1, -0.7049479220616095], [0, 1], [1, 0.15132507808107187], [0, 1], [1, 0.31769031698233974], [0, 1], [1, 0.22920484486621667], [0, 1], [1, -0.42875726928084945], [0, 1], [1, 0.0785038577518904], [0, 1], [1, -0.2426571062131604], [0, 1], [1, 0.3940820933651221], [0, 1], [1, -0.575240538634509], [0, 1], [1, 0.5487224471914391], [0, 1], [1, -0.06510832722198412], [0, 1], [1, -0.09376402663275218], [0, 1], [1, 0.1763754320519917], [0, 1], [1, -0.022166433660436358], [0, 1], [1, -0.4623739888434155], [0, 1], [1, 0.2136758433278967], [0, 1], [1, 0.009996240723701533], [0, 1], [1, 0.0567335125470283], [0, 1], [1, 0.08678643391525664], [0, 1], [1, 0.26892406230016963], [0, 1], [1, -0.5260213289041573], [0, 1], [1, 0.10127511121003252], [0, 1], [1, 0.2303956824532154], [0, 1], [1, -0.1571453182984648], [0, 1], [1, -0.19132886276115002], [0, 1], [1, 0.02575265575252672], [0, 1], [1, 0.17289007389125288], [0, 1], [1, -0.11475301302229857], [0, 1], [1, -0.24824365925180203], [0, 1], [1, 0.19585404369175663], [0, 1], [1, 0.0694872249923364], [0, 1], [1, 0.10268856623914502], [0, 1], [1, -0.2694798314266045], [0, 1], [1, 0.1698752455801228], [0, 1], [1, -0.22930629089830923], [0, 1], [1, 0.38958333688556834], [0, 1], [1, -0.09860574344520145], [0, 1], [1, -0.023372177319862075], [0, 1], [1, -0.2861692552488151], [0, 1], [1, 0.3453913284004546], [0, 1], [1, -0.39609695364401887], [0, -155], [0, -75], [0, -1], [1, -0.833985610109063], [0, -1], [1, 0.48836475680276736], [0, -1], [1, -1.2109603692614037], [0, -1], [1, 2.4295436749177783], [0, -1], [1, 0.44622519224000523], [0, -1], [1, 0.4254410261413356], [0, -1], [1, 0.32082822506530717], [0, -1], [1, -1.8422428986955826], [0, -1], [1, -0.7817390110658688], [0, -1], [1, 1.4409618381331715], [0, -1], [1, -0.007726463463703648], [0, -1], [1, 0.8500725834230562], [0, -1], [1, 0.22556082167718677], [0, -1], [1, 0.07005977500117404], [0, -1], [1, -0.8780956656717827], [0, -1], [1, -0.5293724028938147], [0, -1], [1, 0.48248654099231447], [0, -1], [1, 0.2421277460754374], [0, -1], [1, 0.1001341228003669], [0, -1], [1, -0.7254270374704077], [0, -1], [1, 1.0104463414690108], [0, -1], [1, 0.6969993444073532], [0, -1], [1, -0.2760639005947642], [0, -1], [1, -0.6883802362031508], [0, -1], [1, 0.28960236269941575], [0, -1], [1, 0.26008937055247056], [0, -1], [1, 0.3131142569262614], [0, -1], [1, -0.08933983227924525], [0, -1], [1, -0.9562480848470536], [0, -1], [1, 1.0512234585244333], [0, -1], [1, 0.719749293884073], [0, -1], [1, -0.6054376509006175], [0, -1], [1, -1.0223792672548706], [0, -1], [1, 0.45519957315064946], [0, -1], [1, -0.17372237253804476], [0, -1], [1, 0.3856590320528144], [0, -1], [1, 0.49815229238947345], [0, -1], [1, -0.6530202408060324], [0, -1], [1, 0.6187298031218189], [0, -1], [1, -0.5543121064454497], [0, -1], [1, 0.9242206484426512], [0, -1], [1, -0.9040787313606589], [0, -1], [1, -0.23434112896988904], [0, -1], [1, -0.08502834742329007], [0, -1], [1, 0.6576965191194266], [0, -1], [1, 0.7847249011804959], [0, -1], [1, -0.4975908917233983], [0, -1], [1, 0.13517670202595472], [0, -1], [1, -0.46317106255244517], [0, -1], [1, 0.8601648201802858], [0, -1], [1, -0.1719963245416731], [0, -1], [1, -0.6446491005215529], [0, -1], [1, -0.1727649427770993], [0, -1], [1, 0.5154965524540687], [0, -1], [1, 0.2840070770547838], [0, -1], [1, -0.5901935652206705], [0, -1], [1, -0.0576192344243716], [0, -1], [1, 0.23217575469163204], [0, -1], [1, 0.26343206640184846], [0, -1], [1, -0.30551649093742833], [0, -1], [1, -0.05885617967787217], [0, -1], [1, -0.4379413385455907], [0, -1], [1, 0.4073908841160505], [0, -1], [1, 0.019849961191908762], [0, -1], [1, -0.11166868590269896], [0, -1], [1, 0.28270599534236296], [0, -1], [1, -0.2610526835886042], [0, -1], [1, 0.35358605622123196], [0, -1], [1, -0.18065760095454045], [0, -1], [1, 0.20104622266890995], [0, -1], [1, -0.008284395446611446], [0, -1], [1, -0.009607919672949269], [0, -1], [1, 0.11993362171596592], [0, -1], [1, 0.16720027292181777], [0, -1], [1, 0.0643258078173429], [0, -1], [1, -0.5001785085681822], [0, -1], [1, 0.2946257861821825], [0, -1], [1, -0.05426704097775728], [0, -1], [1, -0.06069068530391214], [0, -1], [1, -0.15952434311147462], [0, 155]] 
 


const eventBus = writable(null);

const full_history = writable(word_gordian_history); // []
const hist_idx = writable(word_gordian_history.length); // 0
const preview_hist_idx = writable(0);
const preview_history = derived([full_history, preview_hist_idx], ([$full_history, $preview_hist_idx]) => {
    return $full_history.slice(0, $preview_hist_idx);
});
const previewing = writable(false);

function freqs_from_hist(hist, hist_idx, n_lines) {
    // this can happen e.g. in restore_metadata
    // since we have an invalid intermediate state
    // one correct solution is to put everything in a single store
    // but for now I just fix hist_idx
    if (hist_idx > hist.length) {
        console.log("hist_idx > hist.length");
        hist_idx = hist.length;
    }
    // history is a list of tuples (movement_type, amount)
    // movement_type: 0 for rotation, 1 for advance
    console.log(hist, hist_idx, n_lines);
    let K = n_lines;
    let freqs = Array(K).fill(0.0);    
    let rot_idx = 0;
    for (let i = 0; i < hist_idx; i++) {
        let [movement_type, amount] = hist[i];
        if (movement_type == 0) {
            rot_idx = ((rot_idx + amount) + K) % K;
        } else {
            freqs[rot_idx] += amount;
        }
    }
    return freqs;
}
function rot_idx_from_hist(hist, hist_idx, n_lines) {
    if (hist_idx > hist.length) {
        // this can happen e.g. in restore_metadata
        // since we have an invalid intermediate state
        // one correct solution is to put everything in a single store
        // but for now I just fix hist_idx
        console.log("hist_idx > hist.length");
        hist_idx = hist.length;
    }
    let rot_idx = 0;
    let K = n_lines;
    for (let i = 0; i < hist_idx; i++) {
        let [movement_type, amount] = hist[i];
        if (movement_type == 0) {
            rot_idx += amount;
        }
    }
    // don't wrap here to avoid jumping from 0 to K-1
    // the freqs are correct, this is just to set the final angles of the lines
    // rot_idx = ((rot_idx % K) + K) % K;
    return rot_idx;
}

const derived_freqs = derived([full_history, hist_idx, previewing, preview_hist_idx, settings], ([$full_history, $hist_idx, $previewing, $preview_hist_idx, $settings]) => {
    let n_lines = $settings.number_of_lines;
    if ($previewing) {
        return freqs_from_hist($full_history, $preview_hist_idx, n_lines);
    } else {
        return freqs_from_hist($full_history, $hist_idx, n_lines);
    }
});
const derived_rot_idx = derived([full_history, hist_idx, previewing, preview_hist_idx, settings], ([$full_history, $hist_idx, $previewing, $preview_hist_idx, $settings]) => {
    let n_lines = $settings.number_of_lines;
    if ($previewing) {
        return rot_idx_from_hist($full_history, $preview_hist_idx, n_lines);
    } else {
        return rot_idx_from_hist($full_history, $hist_idx, n_lines);
    }
});

const metadata = derived([full_history, hist_idx, settings], ([$full_history, $hist_idx, $settings]) => {
    return {
        history: $full_history.slice(0, $hist_idx),
        settings: $settings,
    }
});

function restore_metadata(metadata) {
    // full_history.set(metadata.history);
    // hist_idx.set(metadata.history.length);
    // settings.set(metadata.settings);
    full_history.update(() => {
        previewing.set(false);
        hist_idx.set(metadata.history.length);
        let settings_copy = JSON.parse(JSON.stringify(metadata.settings));
        settings.set(settings_copy);
        let history_copy = JSON.parse(JSON.stringify(metadata.history));
        return history_copy;
    });
}


export { settings,  eventBus,   full_history, hist_idx, preview_history, preview_hist_idx, previewing, derived_freqs, derived_rot_idx,  metadata, restore_metadata  };