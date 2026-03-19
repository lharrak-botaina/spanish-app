import { useState, useRef } from "react";

/* ─── QUESTION BANK ─────────────────────────────────────────────── */
const BANK = {
  grammar: [
    { sentence:"Yo ___ estudiante.", translation:"I ___ a student.", options:["soy","eres","es","somos"], answer:0, explanation:"Use 'soy' (yo form of ser) for permanent identity." },
    { sentence:"Ella ___ en Madrid.", translation:"She ___ in Madrid.", options:["vive","vivo","viven","vivís"], answer:0, explanation:"'Vive' is the ella/él form of vivir (to live)." },
    { sentence:"Nosotros ___ al cine mañana.", translation:"We ___ to the cinema tomorrow.", options:["vamos","vais","van","vas"], answer:0, explanation:"'Vamos' is the nosotros form of ir (to go)." },
    { sentence:"¿Tú ___ hambre?", translation:"Are you hungry?", options:["tienes","tiene","tengo","tenéis"], answer:0, explanation:"'Tienes' is the tú form of tener (to have)." },
    { sentence:"El libro está ___ la mesa.", translation:"The book is ___ the table.", options:["sobre","entre","desde","hacia"], answer:0, explanation:"'Sobre' means 'on/on top of'." },
    { sentence:"Ayer ___ al parque con mi familia.", translation:"Yesterday I ___ to the park with my family.", options:["fui","voy","iré","iba"], answer:0, explanation:"'Fui' is the preterite (past) of ir/ser for yo." },
    { sentence:"Cuando era niño, ___ mucho.", translation:"When I was a child, I ___ a lot.", options:["jugaba","jugué","jugaré","juego"], answer:0, explanation:"'Jugaba' is imperfect — for habitual past actions." },
    { sentence:"Si tuviera dinero, ___ un viaje.", translation:"If I had money, I ___ a trip.", options:["haría","haré","hago","hiciera"], answer:0, explanation:"'Haría' is the conditional — used in hypothetical situations." },
    { sentence:"Me alegra que ___ bien.", translation:"I'm glad that you ___ well.", options:["estés","estás","estarás","estabas"], answer:0, explanation:"After emotion verbs + que, use present subjunctive." },
    { sentence:"Llevo tres horas ___ este informe.", translation:"I've been ___ this report for three hours.", options:["escribiendo","escribir","escrito","escribo"], answer:0, explanation:"'Llevar + gerundio' expresses ongoing duration." },
    { sentence:"___ gato es muy simpático.", translation:"___ cat is very friendly.", options:["El","La","Los","Un"], answer:0, explanation:"'Gato' is masculine, so use 'El'." },
    { sentence:"Ella se ___ María.", translation:"Her name ___ María.", options:["llama","llamo","llaman","llamáis"], answer:0, explanation:"'Llama' is the ella form of llamarse (reflexive)." },
    { sentence:"Ellos ___ muy cansados hoy.", translation:"They ___ very tired today.", options:["están","son","estoy","eres"], answer:0, explanation:"Use 'estar' for temporary states like being tired." },
    { sentence:"¿A qué hora ___ el tren?", translation:"What time ___ the train arrive?", options:["llega","llegué","llegará","llegaban"], answer:0, explanation:"Present tense for schedules and timetables." },
    { sentence:"No creo que ___ tiempo para todo.", translation:"I don't think there ___ time for everything.", options:["haya","hay","habrá","había"], answer:0, explanation:"After 'no creer que', use present subjunctive." },
    { sentence:"El proyecto fue ___ por el comité.", translation:"The project was ___ by the committee.", options:["aprobado","aprobar","aprobando","aprueba"], answer:0, explanation:"Passive voice = ser + past participle." },
    { sentence:"Mañana ___ a visitarte.", translation:"Tomorrow I ___ to visit you.", options:["voy","fui","iba","vaya"], answer:0, explanation:"'Ir a + infinitivo' expresses near future." },
    { sentence:"¿ ___ puedo ayudarte?", translation:"___ can I help you?", options:["En qué","Cómo","Dónde","Cuándo"], answer:0, explanation:"'¿En qué puedo ayudarte?' = How can I help you?" },
    { sentence:"Prefiero ___ en casa esta noche.", translation:"I prefer to ___ home tonight.", options:["quedarme","quedarte","quedarse","quedaos"], answer:0, explanation:"Reflexive verb with yo → quedarme." },
    { sentence:"Ellas ___ a las ocho de la mañana.", translation:"They ___ at eight in the morning.", options:["se despiertan","me despierto","te despiertas","os despertáis"], answer:0, explanation:"'Se despiertan' is the ellas reflexive form of despertarse." },
    { sentence:"Hace dos años que ___ español.", translation:"I ___ Spanish for two years.", options:["estudio","estudié","estudiaba","estudiaré"], answer:0, explanation:"'Hace + time + que + present' = ongoing action." },
    { sentence:"Aunque ___ cansado, siguió trabajando.", translation:"Although he ___ tired, he kept working.", options:["estuviera","estaba","está","estuvo"], answer:0, explanation:"'Aunque' + subjunctive for hypothetical concession." },
    { sentence:"Por favor, ___ la ventana.", translation:"Please ___ the window.", options:["cierra","cierras","cerráis","cierren"], answer:0, explanation:"Affirmative tú command of cerrar (irregular: e→ie)." },
    { sentence:"Nos ___ mucho la película.", translation:"We ___ the movie a lot.", options:["gustó","gustamos","gustaron","gustan"], answer:0, explanation:"'Gustar' agrees with the subject (la película = singular)." },
    { sentence:"Todavía no ___ los deberes.", translation:"I still haven't done my homework.", options:["he hecho","hice","hacía","hago"], answer:0, explanation:"Present perfect (he + participio) for recent/relevant past." },
  ],
  vocabulary: [
    { word:"el madrugador", emoji:"🌅", category:"Daily life", options:["early riser","night owl","sleeper","traveler"], answer:0, example_es:"Mi padre es un madrugador, se levanta a las 5.", example_en:"My father is an early riser, he gets up at 5." },
    { word:"el paraguas", emoji:"☂️", category:"Objects", options:["umbrella","raincoat","boots","hat"], answer:0, example_es:"Lleva el paraguas, va a llover.", example_en:"Take the umbrella, it's going to rain." },
    { word:"la madrugada", emoji:"🌙", category:"Time", options:["early morning / dawn","noon","afternoon","midnight exactly"], answer:0, example_es:"Llegamos a casa de madrugada.", example_en:"We got home in the early hours of the morning." },
    { word:"el semáforo", emoji:"🚦", category:"City", options:["traffic light","roundabout","crosswalk","speed bump"], answer:0, example_es:"Para en el semáforo en rojo.", example_en:"Stop at the red traffic light." },
    { word:"la nevera", emoji:"🧊", category:"Home", options:["fridge","oven","dishwasher","microwave"], answer:0, example_es:"Pon la leche en la nevera.", example_en:"Put the milk in the fridge." },
    { word:"el cajero automático", emoji:"🏧", category:"Finance", options:["ATM","bank teller","safe","wallet"], answer:0, example_es:"Necesito sacar dinero del cajero automático.", example_en:"I need to withdraw money from the ATM." },
    { word:"la bufanda", emoji:"🧣", category:"Clothing", options:["scarf","gloves","hat","coat"], answer:0, example_es:"En invierno siempre llevo bufanda.", example_en:"In winter I always wear a scarf." },
    { word:"el ayuntamiento", emoji:"🏛️", category:"City", options:["town hall","courthouse","library","police station"], answer:0, example_es:"El ayuntamiento organiza eventos culturales.", example_en:"The town hall organises cultural events." },
    { word:"madrugar", emoji:"⏰", category:"Verbs", options:["to wake up early","to stay up late","to sleep in","to nap"], answer:0, example_es:"Tengo que madrugar mañana para coger el tren.", example_en:"I have to wake up early tomorrow to catch the train." },
    { word:"la beca", emoji:"🎓", category:"Education", options:["scholarship","grade","course","degree"], answer:0, example_es:"Consiguió una beca para estudiar en el extranjero.", example_en:"She got a scholarship to study abroad." },
    { word:"el ascensor", emoji:"🛗", category:"Building", options:["elevator","escalator","stairs","ramp"], answer:0, example_es:"El ascensor está roto, hay que subir a pie.", example_en:"The elevator is broken, we have to walk up." },
    { word:"el espejo", emoji:"🪞", category:"Home", options:["mirror","window","picture frame","clock"], answer:0, example_es:"Se miró en el espejo antes de salir.", example_en:"She looked in the mirror before leaving." },
    { word:"la mudanza", emoji:"📦", category:"Daily life", options:["moving house","renovation","cleaning","decoration"], answer:0, example_es:"Este fin de semana hacemos la mudanza.", example_en:"This weekend we're moving house." },
    { word:"el sueldo", emoji:"💰", category:"Work", options:["salary","bill","bonus","pension"], answer:0, example_es:"Negocié un aumento de sueldo.", example_en:"I negotiated a salary raise." },
    { word:"la carretera", emoji:"🛣️", category:"Transport", options:["highway / road","street","avenue","motorway toll"], answer:0, example_es:"La carretera está cortada por obras.", example_en:"The road is closed due to roadworks." },
    { word:"enchufe", emoji:"🔌", category:"Home", options:["plug / socket","switch","cable","battery"], answer:0, example_es:"¿Dónde está el enchufe más cercano?", example_en:"Where is the nearest socket?" },
    { word:"el buzón", emoji:"📬", category:"City", options:["mailbox","postcard","package","stamp"], answer:0, example_es:"Hay una carta en el buzón.", example_en:"There is a letter in the mailbox." },
    { word:"el techo", emoji:"🏠", category:"Home", options:["ceiling / roof","floor","wall","door"], answer:0, example_es:"El techo tiene una gotera.", example_en:"The ceiling has a leak." },
    { word:"la factura", emoji:"🧾", category:"Finance", options:["invoice / bill","receipt","contract","tax"], answer:0, example_es:"Me llegó la factura del gas.", example_en:"The gas bill arrived." },
    { word:"el atasco", emoji:"🚗", category:"Transport", options:["traffic jam","parking","detour","roundabout"], answer:0, example_es:"Llegué tarde por un atasco enorme.", example_en:"I was late because of a huge traffic jam." },
    { word:"la queja", emoji:"😤", category:"Communication", options:["complaint","advice","request","question"], answer:0, example_es:"Presenté una queja al director.", example_en:"I filed a complaint with the manager." },
    { word:"el plazo", emoji:"📅", category:"Work", options:["deadline / deadline","period","extension","contract"], answer:0, example_es:"El plazo de entrega es el viernes.", example_en:"The submission deadline is Friday." },
    { word:"la propina", emoji:"💵", category:"Restaurant", options:["tip","discount","receipt","menu"], answer:0, example_es:"Dejamos una buena propina al camarero.", example_en:"We left a good tip for the waiter." },
    { word:"el horario", emoji:"🕐", category:"Daily life", options:["schedule / timetable","alarm","calendar","planner"], answer:0, example_es:"El horario del tren cambia los domingos.", example_en:"The train timetable changes on Sundays." },
    { word:"la matrícola", emoji:"🎓", category:"Education", options:["enrolment / tuition fee","grade","exam","thesis"], answer:0, example_es:"La matrícula universitaria es muy cara.", example_en:"University tuition is very expensive." },
  ],
  listening: [
    { passage:"Buenos días. Quisiera reservar una mesa para cuatro personas esta noche, a las ocho y media.", question:"What is the person trying to do?", options:["Book a table for 4 at 8:30 PM","Order food for delivery","Cancel a reservation","Ask for the menu"], answer:0, topic:"Restaurant reservation" },
    { passage:"El tren con destino a Barcelona saldrá con veinte minutos de retraso desde el andén número tres.", question:"What is the announcement about?", options:["A train to Barcelona is delayed 20 minutes, platform 3","A train to Barcelona is cancelled","A train arrives at platform 3 on time","Platform 3 is closed"], answer:0, topic:"Train station announcement" },
    { passage:"Mañana habrá lluvias en el norte del país, mientras que en el sur se esperan temperaturas de hasta 35 grados.", question:"What will the weather be like in the south tomorrow?", options:["Up to 35°C and sunny","Rainy and cold","Cloudy with strong winds","Stormy"], answer:0, topic:"Weather forecast" },
    { passage:"Para llegar al museo, coge la primera calle a la derecha, luego sigue todo recto unos doscientos metros y está justo enfrente del parque.", question:"Where is the museum?", options:["Turn right, then 200m straight, opposite the park","Turn left at the park","Behind the library, 200m away","Next to the train station"], answer:0, topic:"Giving directions" },
    { passage:"Hola, llamo para confirmar mi cita con el médico para el jueves a las diez de la mañana. ¿Sigue disponible esa hora?", question:"Why is the person calling?", options:["To confirm a doctor's appointment on Thursday at 10 AM","To cancel an appointment","To ask for test results","To make a new appointment"], answer:0, topic:"Doctor's appointment" },
    { passage:"En el supermercado hay una oferta especial esta semana: dos por uno en todos los productos de limpieza del hogar.", question:"What is on special offer?", options:["2-for-1 on all home cleaning products","50% off fruit and vegetables","Free delivery on all orders","Buy 3 get 1 free on dairy"], answer:0, topic:"Supermarket offer" },
    { passage:"María lleva tres años estudiando medicina en la universidad. Este verano hará sus primeras prácticas en un hospital.", question:"What will María do this summer?", options:["Do her first hospital internship","Graduate from university","Move to another city","Start a new degree"], answer:0, topic:"Student life" },
    { passage:"El museo abre de martes a domingo, de diez de la mañana a seis de la tarde. Los lunes permanece cerrado.", question:"When is the museum closed?", options:["Mondays","Tuesdays","Sundays","Weekends"], answer:0, topic:"Museum hours" },
    { passage:"Busco un piso de dos habitaciones, con terraza, cerca del centro. El presupuesto máximo es ochocientos euros al mes.", question:"What is the maximum monthly budget for the flat?", options:["€800","€600","€1000","€700"], answer:0, topic:"Flat hunting" },
    { passage:"El vuelo número IB3421 con destino a Londres ha sido cancelado debido a condiciones meteorológicas adversas. Los pasajeros deben dirigirse al mostrador de información.", question:"What happened to flight IB3421?", options:["It was cancelled due to bad weather","It was delayed by two hours","It departed early","It changed gates"], answer:0, topic:"Flight cancellation" },
    { passage:"Para hacer esta receta necesitas doscientos gramos de harina, tres huevos, leche y una pizca de sal.", question:"How many eggs does the recipe need?", options:["Three","Two","Four","One"], answer:0, topic:"Cooking recipe" },
    { passage:"La biblioteca cierra más temprano los viernes: a las cinco de la tarde en vez de las ocho.", question:"What is different about Fridays at the library?", options:["It closes at 5 PM instead of 8 PM","It opens later","It is completely closed","It closes at 6 PM"], answer:0, topic:"Library hours" },
    { passage:"Me llamo Carlos y trabajo como enfermero en un hospital público desde hace cinco años. Me encanta mi trabajo aunque los turnos de noche son difíciles.", question:"What is Carlos's job?", options:["Nurse in a public hospital","Doctor in a private clinic","Paramedic","Medical receptionist"], answer:0, topic:"Job description" },
    { passage:"Este fin de semana se celebra el festival de música en la plaza mayor. La entrada es gratuita y habrá conciertos desde las seis de la tarde.", question:"How much does the festival cost?", options:["It's free","€10","€5","€15"], answer:0, topic:"Music festival" },
    { passage:"Si quieres mejorar tu español rápidamente, te recomiendo ver series en español con subtítulos, hablar con nativos y leer libros sencillos.", question:"What advice is given to improve Spanish quickly?", options:["Watch Spanish series, speak with natives, read simple books","Only study grammar books","Take expensive classes","Listen to music only"], answer:0, topic:"Language learning tips" },
    { passage:"El ayuntamiento anuncia que las obras en la calle principal comenzarán el lunes próximo y durarán aproximadamente dos semanas.", question:"How long will the roadworks last?", options:["About two weeks","One week","Three weeks","One month"], answer:0, topic:"City works announcement" },
    { passage:"Hola, soy tu vecina del tercero. Te llamo porque esta tarde van a revisar el ascensor y necesitan acceder al cuarto de contadores.", question:"Why is the neighbour calling?", options:["The lift is being inspected and they need access to the meter room","There is a problem with electricity","A package arrived","The building has a leak"], answer:0, topic:"Neighbour call" },
    { passage:"La empresa ofrece un puesto de trabajo de jornada completa con contrato indefinido. Se requiere experiencia mínima de dos años y nivel de inglés B2.", question:"What experience is required for the job?", options:["Minimum 2 years","5 years","No experience needed","1 year"], answer:0, topic:"Job offer" },
    { passage:"Para renovar el pasaporte necesitas traer el pasaporte antiguo, dos fotos recientes y el formulario de solicitud rellenado.", question:"What do you NOT need for passport renewal?", options:["A birth certificate","Old passport","Two recent photos","Completed application form"], answer:0, topic:"Passport renewal" },
    { passage:"Hoy en clase aprendimos a usar el pretérito imperfecto para describir acciones habituales en el pasado y para dar contexto a una historia.", question:"What was today's lesson about?", options:["The imperfect tense for habitual past actions and storytelling context","The present subjunctive","Future tense formation","Direct object pronouns"], answer:0, topic:"Spanish class" },
  ],
  writing: [
    { prompt_en:"Describe your daily routine using at least 5 different verbs.", prompt_es:"Describe tu rutina diaria usando al menos 5 verbos diferentes.", hint:"Use reflexive verbs: levantarse, ducharse, desayunar, trabajar, acostarse", example:"Me levanto a las siete. Me ducho y desayuno café con tostadas. Luego voy al trabajo en autobús. Por la noche ceno con mi familia y me acuesto a las once.", words_min:25, words_max:60 },
    { prompt_en:"Write about what you did last weekend. Use the preterite tense.", prompt_es:"Escribe sobre lo que hiciste el fin de semana pasado. Usa el pretérito indefinido.", hint:"Preterite: fui, comí, vi, estuve, hablé, jugué", example:"El sábado fui al mercado con mi madre. Compramos verduras y fruta. Por la tarde vi una película en casa. El domingo quedé con unos amigos y comimos en un restaurante italiano.", words_min:30, words_max:65 },
    { prompt_en:"Describe a place you love using ser and estar correctly.", prompt_es:"Describe un lugar que te encanta usando ser y estar correctamente.", hint:"Ser = permanent: La playa es grande. Estar = location/state: Está en el norte.", example:"Me encanta la playa de mi ciudad. Es muy grande y tranquila. Está en el norte, cerca de las montañas. En verano está llena de gente, pero en otoño es perfecta para pasear.", words_min:25, words_max:60 },
    { prompt_en:"Write a short message to a friend inviting them to your birthday party.", prompt_es:"Escribe un mensaje corto a un amigo invitándole a tu fiesta de cumpleaños.", hint:"Include: date, time, place, what to bring", example:"¡Hola Ana! Te invito a mi fiesta de cumpleaños el sábado a las ocho de la noche. Es en mi casa, en la calle Mayor número cinco. ¡Trae algo de beber! Va a ser muy divertido.", words_min:25, words_max:55 },
    { prompt_en:"Talk about your plans for next summer using 'ir a + infinitive'.", prompt_es:"Habla sobre tus planes para el próximo verano usando 'ir a + infinitivo'.", hint:"Voy a + infinitive: Voy a viajar / visitar / descansar / aprender", example:"El próximo verano voy a viajar a España con mi familia. Vamos a visitar Madrid y Barcelona. También voy a aprender a cocinar paella. No voy a trabajar, solo voy a descansar.", words_min:25, words_max:60 },
    { prompt_en:"Describe a person you admire (appearance + personality).", prompt_es:"Describe a una persona que admiras (aspecto físico y personalidad).", hint:"Ser for characteristics: es alta, es simpática, tiene los ojos azules", example:"Mi madre es la persona que más admiro. Es alta y tiene el pelo castaño. Es muy trabajadora y siempre está de buen humor. Me ayuda mucho y me da buenos consejos.", words_min:25, words_max:60 },
    { prompt_en:"Write about a problem in your city and suggest a solution.", prompt_es:"Escribe sobre un problema en tu ciudad y propón una solución.", hint:"Use: hay mucho/a, es necesario, se debería, el ayuntamiento debe", example:"En mi ciudad hay mucho tráfico. Es un problema muy grave. Se debería mejorar el transporte público y crear más carriles bici. El ayuntamiento debe invertir en soluciones sostenibles.", words_min:25, words_max:60 },
    { prompt_en:"Describe what your life was like when you were a child (imperfect tense).", prompt_es:"Describe cómo era tu vida cuando eras niño/a (pretérito imperfecto).", hint:"Imperfect: era, tenía, vivía, jugaba, iba, comía", example:"Cuando era niño, vivía en un pueblo pequeño. Todos los días jugaba con mis amigos en el parque. Mis padres cocinaban mucho y comíamos juntos cada noche. Era una vida muy tranquila.", words_min:25, words_max:60 },
    { prompt_en:"Write an email to a hotel asking about availability and prices.", prompt_es:"Escribe un correo electrónico a un hotel preguntando por disponibilidad y precios.", hint:"Formal: Estimados señores / Me gustaría saber / ¿Podrían informarme?", example:"Estimados señores, me gustaría reservar una habitación doble para dos noches, del 15 al 17 de agosto. ¿Podrían informarme sobre los precios y la disponibilidad? Muchas gracias.", words_min:25, words_max:60 },
    { prompt_en:"Give your opinion about social media using expressions like 'creo que', 'en mi opinión'.", prompt_es:"Da tu opinión sobre las redes sociales usando expresiones como 'creo que', 'en mi opinión'.", hint:"Creo que / En mi opinión / Por un lado... por otro lado / Sin embargo", example:"En mi opinión, las redes sociales tienen ventajas y desventajas. Por un lado, nos permiten conectar con amigos. Por otro lado, creo que pasamos demasiado tiempo mirando el móvil.", words_min:25, words_max:65 },
    { prompt_en:"Describe the house or flat you would like to live in (use conditional).", prompt_es:"Describe la casa o piso en el que te gustaría vivir (usa el condicional).", hint:"Me gustaría / Tendría / Estaría / Habría / Sería", example:"Me gustaría vivir en una casa grande con jardín. Tendría tres habitaciones y un baño moderno. Estaría en las afueras de la ciudad, cerca de un parque. También habría una cocina amplia.", words_min:25, words_max:60 },
    { prompt_en:"Write about a trip you took. Where did you go? What did you do?", prompt_es:"Escribe sobre un viaje que hiciste. ¿Adónde fuiste? ¿Qué hiciste?", hint:"Mix preterite + imperfect: fui (preterite) + era/hacía (imperfect for description)", example:"El verano pasado fui a Portugal con unos amigos. La ciudad era preciosa y hacía muy buen tiempo. Visitamos museos, comimos marisco y paseamos por el centro histórico. Lo pasé genial.", words_min:25, words_max:65 },
  ],
};

/* ─── shuffle helper ─────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

/* ─── phases / skills data ───────────────────────────────────────── */
const PHASES = [
  { id:1, name:"Foundation", range:"A1.2 → A2", weeks:"Weeks 1–6", color:"#4ade80", emoji:"🌱",
    desc:"Master present tense, core vocabulary & basic sentence structure.",
    tip:"Don't try to memorize every rule. Focus on patterns: -ar verbs all follow the same endings. Exposure beats memorization!",
    topics:[
      {week:1,title:"Ser / Estar & Present Tense",skills:["Verbs ser vs estar (uses & contrast)","Regular -ar/-er/-ir verbs","Greetings & self-introduction"]},
      {week:2,title:"Articles & Irregular Verbs",skills:["Definite & indefinite articles","Irregular present (tener, ir, hacer…)","Family & relationships vocab"]},
      {week:3,title:"Descriptions",skills:["Adjective agreement & placement","Numbers 1–100 & ordinals","Colors, size, physical descriptions"]},
      {week:4,title:"Daily Routine",skills:["Reflexive verbs (levantarse, ducharse…)","Time expressions (a las, por la mañana)","Daily activities vocabulary"]},
      {week:5,title:"Questions & Food",skills:["Question words (qué, cómo, dónde, cuándo)","Forming questions in Spanish","Food, restaurant & shopping vocab"]},
      {week:6,title:"Phase 1 Review",skills:["A1.2 → A2 grammar consolidation","Oral practice: describe your day","Mini self-test"]},
    ]},
  { id:2, name:"Growth", range:"A2 → A2+", weeks:"Weeks 7–13", color:"#f59e0b", emoji:"📈",
    desc:"Unlock past tenses, object pronouns and richer self-expression.",
    tip:"Think of preterite as a photo 📸 (completed event) and imperfect as a movie 🎬 (ongoing background). 'Fui' vs 'iba' — snapshot vs scene.",
    topics:[
      {week:7,title:"Preterite Tense",skills:["Regular preterite (-ar/-er/-ir)","Talking about finished past events","Weekend & leisure vocabulary"]},
      {week:8,title:"Preterite Irregular",skills:["Irregular preterite (ir, ser, tener, hacer)","Travel vocabulary","Recounting experiences"]},
      {week:9,title:"Imperfect Tense",skills:["Imperfect forms & uses","Childhood memories vocabulary","Describing habitual past actions"]},
      {week:10,title:"Preterite vs Imperfect",skills:["Contrast: snapshot vs background","Storytelling connectors","Narrative writing practice"]},
      {week:11,title:"Object Pronouns",skills:["Direct object pronouns (lo, la, los, las)","Indirect object pronouns (le, les)","Emotions & feelings vocabulary"]},
      {week:12,title:"Advanced Reflexives",skills:["Reflexive + reciprocal verbs","Health & body vocabulary","Medical conversations"]},
      {week:13,title:"Phase 2 Review",skills:["A2 grammar consolidation","Story narration practice","Progress assessment"]},
    ]},
  { id:3, name:"Breakthrough", range:"A2+ → B1", weeks:"Weeks 14–20", color:"#a855f7", emoji:"🚀",
    desc:"Reach B1 with future, conditional, subjunctive & complex writing.",
    tip:"For the subjunctive: if you can replace 'que' with 'to' in English, you likely need it. 'I want you to come' → 'Quiero que vengas'.",
    topics:[
      {week:14,title:"Future Tense",skills:["Simple future forms (regular & irregular)","Plans, predictions & promises","Weather & environment vocab"]},
      {week:15,title:"Conditional",skills:["Conditional forms & uses","Hypothetical situations","Polite requests with conditional"]},
      {week:16,title:"Subjunctive Intro",skills:["Present subjunctive forms","Verbs of desire (querer que, esperar que)","Expressions of preference"]},
      {week:17,title:"Subjunctive: Emotion & Doubt",skills:["Emotion triggers (alegrarse de que…)","Doubt & denial (no creo que…)","Abstract vocabulary for opinions"]},
      {week:18,title:"Passive & Connectors",skills:["Passive voice (ser + participio)","Advanced discourse connectors","News & current events vocabulary"]},
      {week:19,title:"Writing & Opinions",skills:["Essay structure in Spanish","Expressing agreement/disagreement","Formal vs informal register"]},
      {week:20,title:"B1 Final Preparation",skills:["Full grammar & vocabulary review","Mock B1 exercises","Exam tips & strategies"]},
    ]},
];

const SKILLS = [
  {id:"grammar",    icon:"📝", label:"Grammar",    color:"#818cf8", bg:"rgba(129,140,248,0.12)", border:"rgba(129,140,248,0.3)"},
  {id:"vocabulary", icon:"📖", label:"Vocabulary",  color:"#34d399", bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.3)"},
  {id:"listening",  icon:"🔊", label:"Listening",   color:"#f472b6", bg:"rgba(244,114,182,0.12)", border:"rgba(244,114,182,0.3)"},
  {id:"writing",    icon:"✍️",  label:"Writing",     color:"#f59e0b", bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.3)"},
];

/* ─── TTS ─────────────────────────────────────────────────────────── */
function speak(text, onEnd) {
  if(!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang="es-ES"; u.rate=0.82;
  const voices = speechSynthesis.getVoices();
  const es = voices.find(v=>v.lang.startsWith("es"));
  if(es) u.voice=es;
  if(onEnd) u.onend=onEnd;
  speechSynthesis.speak(u);
}

/* ─── MAIN APP ────────────────────────────────────────────────────── */
export default function App() {
  const [view,         setView]        = useState("plan");
  const [currentPhase, setCurrentPhase]= useState(1);
  const [expandedWeek, setExpandedWeek]= useState(null);
  const [activeSkill,  setActiveSkill] = useState(null);
  const [exercise,     setExercise]    = useState(null);
  const [answered,     setAnswered]    = useState(false);
  const [selected,     setSelected]    = useState(null);
  const [typed,        setTyped]       = useState("");
  const [showAnswer,   setShowAnswer]  = useState(false);
  const [speaking,     setSpeaking]    = useState(false);
  const [played,       setPlayed]      = useState(false);
  const [scores,       setScores]      = useState({grammar:[],vocabulary:[],listening:[],writing:[]});
  const [streak,       setStreak]      = useState(0);

  // Track which indices have been shown per skill — no repeats until all done
  const seen = useRef({grammar:[], vocabulary:[], listening:[], writing:[]});

  const phase = PHASES[currentPhase-1];
  const totalDone    = Object.values(scores).flat().length;
  const totalCorrect = Object.values(scores).flat().filter(Boolean).length;
  const accuracy     = totalDone ? Math.round(totalCorrect/totalDone*100) : 0;

  /* ── pick next unique question ── */
  function pickQuestion(skillId) {
    const pool = BANK[skillId];
    let available = seen.current[skillId];
    // if all seen, reset
    if(available.length >= pool.length) {
      seen.current[skillId] = [];
      available = [];
    }
    const remaining = pool.map((_,i)=>i).filter(i=>!available.includes(i));
    const idx = remaining[Math.floor(Math.random()*remaining.length)];
    seen.current[skillId].push(idx);
    return pool[idx];
  }

  function startSkill(skillId) {
    const q = pickQuestion(skillId);
    let ex = { ...q };
    // shuffle options for mcq-style questions
    if(skillId !== "writing") {
      const correct = q.options[q.answer];
      const shuffled = shuffle(q.options);
      ex = { ...q, options: shuffled, answer: shuffled.indexOf(correct) };
    }
    setActiveSkill(skillId);
    setExercise(ex);
    setAnswered(false);
    setSelected(null);
    setTyped("");
    setShowAnswer(false);
    setPlayed(false);
    setSpeaking(false);
    speechSynthesis?.cancel();
  }

  function choose(idx) {
    if(answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === exercise.answer;
    setScores(prev=>({...prev,[activeSkill]:[...prev[activeSkill],correct?1:0]}));
    if(correct) setStreak(s=>s+1); else setStreak(0);
  }

  function submitWriting() {
    if(!typed.trim()||answered) return;
    setAnswered(true);
    setShowAnswer(true);
    setScores(prev=>({...prev,writing:[...prev.writing, typed.trim().split(/\s+/).length>=10?1:0]}));
  }

  function nextExercise() { startSkill(activeSkill); }
  function backToSkills() { setActiveSkill(null); setExercise(null); speechSynthesis?.cancel(); }
  const doneCount = sk => seen.current[sk].length;
  const totalBank = sk => BANK[sk].length;

  return (
    <div style={{minHeight:"100vh",background:"#07070f",color:"#e8e0f8",
      fontFamily:"'Playfair Display',Georgia,serif",
      backgroundImage:"radial-gradient(ellipse at 10% 75%,#130a25 0%,transparent 50%), radial-gradient(ellipse at 90% 10%,#071220 0%,transparent 50%)"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Crimson+Pro:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#2a1a4a;border-radius:4px}
        .tab{padding:.45rem 1.1rem;border-radius:50px;border:1.5px solid transparent;
          font-family:'Crimson Pro',serif;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:#6a5a8a;}
        .tab.on{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;}
        .tab:hover:not(.on){border-color:rgba(168,85,247,.3);color:#c084fc;}
        .card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.2rem;}
        .scard{border-radius:14px;padding:1.1rem 1.2rem;cursor:pointer;transition:all .22s;border:2px solid transparent;}
        .scard:hover{transform:translateY(-3px);filter:brightness(1.12);}
        .cta{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;
          padding:.65rem 1.7rem;border-radius:50px;font-family:'Crimson Pro',serif;font-size:.9rem;
          font-weight:600;cursor:pointer;transition:opacity .18s;letter-spacing:.04em;}
        .cta:hover{opacity:.84;} .cta:disabled{opacity:.35;cursor:not-allowed;}
        .ghost{background:rgba(255,255,255,.06);color:#9b8fb0;border:1px solid rgba(255,255,255,.1);
          padding:.5rem 1rem;border-radius:8px;font-family:'Crimson Pro',serif;font-size:.88rem;cursor:pointer;transition:all .2s;}
        .ghost:hover{background:rgba(255,255,255,.1);}
        .opt{width:100%;padding:.72rem 1rem;margin:.32rem 0;border-radius:10px;
          border:1.5px solid rgba(255,255,255,.09);background:rgba(255,255,255,.04);color:#e0d8f0;
          font-family:'Crimson Pro',serif;font-size:.98rem;cursor:pointer;text-align:left;
          transition:all .18s;display:flex;align-items:center;gap:.6rem;}
        .opt:hover:not(.dis){background:rgba(255,255,255,.09);}
        .opt.ok{background:rgba(74,222,128,.14);border-color:#4ade80;color:#4ade80;}
        .opt.bad{background:rgba(239,68,68,.12);border-color:#ef4444;color:#ef4444;}
        .opt.dis{cursor:default;}
        .wi{width:100%;padding:.8rem 1rem;border-radius:10px;border:1.5px solid rgba(255,255,255,.14);
          background:rgba(255,255,255,.05);color:#f0e8ff;font-family:'Crimson Pro',serif;
          font-size:.98rem;resize:vertical;min-height:100px;outline:none;transition:border-color .2s;line-height:1.6;}
        .wi:focus{border-color:#a855f7;}
        .wrow{padding:.65rem .9rem;border-radius:10px;cursor:pointer;border:1px solid rgba(255,255,255,.07);
          background:rgba(255,255,255,.03);transition:all .18s;margin-bottom:.38rem;
          display:flex;align-items:center;justify-content:space-between;}
        .wrow:hover{background:rgba(255,255,255,.07);}
        .pbg{height:4px;background:rgba(255,255,255,.07);border-radius:4px;}
        .pfill{height:4px;border-radius:4px;background:linear-gradient(90deg,#7c3aed,#a855f7);transition:width .5s;}
        .chip{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .6rem;border-radius:20px;
          font-family:'Crimson Pro',serif;font-size:.75rem;font-weight:600;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp .28s ease both;}
      `}</style>

      {/* HEADER */}
      <div style={{padding:"1rem 1.4rem",borderBottom:"1px solid rgba(255,255,255,.06)",
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".8rem"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
            <span style={{fontSize:"1.5rem"}}>🇪🇸</span>
            <h1 style={{fontSize:"1.25rem",fontWeight:700,color:"#f0e8ff"}}>A1.2 → B1 Journey</h1>
          </div>
          <p style={{color:"#6a5a8a",fontFamily:"'Crimson Pro',serif",fontSize:".75rem",marginTop:".1rem"}}>
            20 weeks · 1 hour/day · {Object.values(BANK).flat().length} unique questions · no internet needed
          </p>
        </div>
        <div style={{display:"flex",gap:".3rem",background:"rgba(255,255,255,.04)",borderRadius:50,
          padding:".28rem",border:"1px solid rgba(255,255,255,.07)"}}>
          {[["plan","📅 Plan"],["practice","🎯 Practice"],["progress","📊 Progress"]].map(([v,l])=>(
            <button key={v} className={`tab${view===v?" on":""}`} onClick={()=>setView(v)}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"}}>
          {streak>0 && <span className="chip" style={{background:"rgba(251,191,36,.12)",border:"1px solid rgba(251,191,36,.3)",color:"#fbbf24"}}>🔥 {streak} streak</span>}
          {totalDone>0 && <span className="chip" style={{background:"rgba(168,85,247,.12)",border:"1px solid rgba(168,85,247,.3)",color:"#c084fc"}}>⚡ {accuracy}% accuracy</span>}
          {totalDone>0 && <span className="chip" style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",color:"#34d399"}}>✅ {totalDone} done</span>}
        </div>
      </div>

      <div style={{maxWidth:780,margin:"0 auto",padding:"1.4rem 1.2rem"}}>

        {/* ══ PLAN ══ */}
        {view==="plan" && (
          <div className="fade">
            <div className="card" style={{marginBottom:"1.3rem",background:"linear-gradient(135deg,rgba(124,58,237,.14),rgba(168,85,247,.06))",border:"1px solid rgba(168,85,247,.22)"}}>
              <h3 style={{color:"#f0e8ff",fontWeight:700,fontSize:"1.05rem",marginBottom:".8rem"}}>⏰ Your Daily 1-Hour Plan</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:".55rem"}}>
                {[["📝","Grammar","0:00–0:15","Conjugations, fill-in-blanks","#818cf8"],
                  ["📖","Vocabulary","0:15–0:30","Word drills & meanings","#34d399"],
                  ["🔊","Listening","0:30–0:45","Audio comprehension","#f472b6"],
                  ["✍️","Writing","0:45–1:00","Short compositions","#f59e0b"]
                ].map(([ic,sk,time,desc,col])=>(
                  <div key={sk} style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:".7rem .85rem"}}>
                    <div style={{color:col,fontFamily:"'Crimson Pro',serif",fontWeight:600,fontSize:".9rem"}}>{ic} {sk}</div>
                    <div style={{color:col,fontFamily:"'Crimson Pro',serif",fontSize:".72rem",opacity:.75,margin:".1rem 0"}}>{time}</div>
                    <div style={{color:"#6a5a8a",fontFamily:"'Crimson Pro',serif",fontSize:".74rem"}}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"flex",gap:".5rem",marginBottom:"1.1rem"}}>
              {PHASES.map(ph=>(
                <button key={ph.id} onClick={()=>{setCurrentPhase(ph.id);setExpandedWeek(null);}}
                  style={{flex:1,padding:".6rem .4rem",borderRadius:12,cursor:"pointer",lineHeight:1.4,
                    border:`2px solid ${currentPhase===ph.id?ph.color:"rgba(255,255,255,.09)"}`,
                    background:currentPhase===ph.id?`${ph.color}18`:"rgba(255,255,255,.03)",
                    color:currentPhase===ph.id?ph.color:"#5a4a7a",
                    fontFamily:"'Crimson Pro',serif",fontSize:".8rem",fontWeight:600,transition:"all .2s"}}>
                  {ph.emoji} {ph.name}<br/><span style={{fontSize:".68rem",opacity:.75}}>{ph.weeks}</span>
                </button>
              ))}
            </div>

            <div className="card fade" style={{marginBottom:".9rem",background:`linear-gradient(135deg,${phase.color}10,${phase.color}05)`,border:`1px solid ${phase.color}2a`}}>
              <div style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".4rem"}}>
                <span style={{fontSize:"1.4rem"}}>{phase.emoji}</span>
                <div>
                  <h2 style={{color:phase.color,fontSize:"1.1rem",fontWeight:700}}>Phase {phase.id}: {phase.name}</h2>
                  <p style={{color:"#9b8fb0",fontFamily:"'Crimson Pro',serif",fontSize:".78rem"}}>{phase.range} · {phase.weeks}</p>
                </div>
              </div>
              <p style={{color:"#8b7ba0",fontFamily:"'Crimson Pro',serif",fontSize:".87rem"}}>{phase.desc}</p>
            </div>

            {phase.topics.map(t=>(
              <div key={t.week}>
                <div className="wrow" onClick={()=>setExpandedWeek(expandedWeek===t.week?null:t.week)}>
                  <div style={{display:"flex",alignItems:"center",gap:".65rem"}}>
                    <span style={{width:26,height:26,borderRadius:"50%",flexShrink:0,
                      background:`${phase.color}1e`,border:`1px solid ${phase.color}45`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:phase.color,fontFamily:"'Crimson Pro',serif",fontSize:".7rem",fontWeight:700}}>
                      {t.week}
                    </span>
                    <span style={{color:"#e0d8f0",fontFamily:"'Crimson Pro',serif",fontSize:".9rem",fontWeight:600}}>
                      Week {t.week}: {t.title}
                    </span>
                  </div>
                  <span style={{color:"#4a3a6a",fontSize:".8rem"}}>{expandedWeek===t.week?"▲":"▼"}</span>
                </div>
                {expandedWeek===t.week && (
                  <div className="fade" style={{marginLeft:".9rem",marginBottom:".35rem",background:`${phase.color}08`,borderRadius:10,padding:".7rem 1rem",border:`1px solid ${phase.color}1c`}}>
                    {t.skills.map(s=>(
                      <div key={s} style={{display:"flex",alignItems:"center",gap:".5rem",padding:".28rem 0",borderBottom:"1px solid rgba(255,255,255,.04)",color:"#c4b5d4",fontFamily:"'Crimson Pro',serif",fontSize:".83rem"}}>
                        <span style={{color:phase.color}}>›</span>{s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{marginTop:"1.2rem",textAlign:"center"}}>
              <button className="cta" onClick={()=>setView("practice")}>Start Today's Practice →</button>
            </div>
          </div>
        )}

        {/* ══ PRACTICE — skill picker ══ */}
        {view==="practice" && !activeSkill && (
          <div className="fade">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.2rem",flexWrap:"wrap",gap:".6rem"}}>
              <div>
                <h2 style={{color:"#f0e8ff",fontSize:"1.3rem",fontWeight:700,marginBottom:".2rem"}}>Today's Practice</h2>
                <p style={{color:"#7a6b9a",fontFamily:"'Crimson Pro',serif",fontSize:".87rem"}}>
                  {Object.values(BANK).flat().length} unique questions · no repeats until all done ✨
                </p>
              </div>
              <div style={{display:"flex",gap:".35rem"}}>
                {PHASES.map(ph=>(
                  <button key={ph.id} onClick={()=>setCurrentPhase(ph.id)}
                    style={{padding:".35rem .65rem",borderRadius:20,cursor:"pointer",
                      fontFamily:"'Crimson Pro',serif",fontSize:".75rem",fontWeight:600,
                      border:`1.5px solid ${currentPhase===ph.id?ph.color:"rgba(255,255,255,.1)"}`,
                      background:currentPhase===ph.id?`${ph.color}18`:"transparent",
                      color:currentPhase===ph.id?ph.color:"#5a4a7a",transition:"all .2s"}}>
                    {ph.emoji} {ph.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem",marginBottom:"1.2rem"}}>
              {SKILLS.map(sk=>{
                const done=scores[sk.id].length, corr=scores[sk.id].filter(Boolean).length;
                const pct=done?Math.round(corr/done*100):0;
                const seen_n=doneCount(sk.id), total_n=totalBank(sk.id);
                return (
                  <div key={sk.id} className="scard" style={{background:sk.bg,border:`2px solid ${sk.border}`}}
                    onClick={()=>startSkill(sk.id)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:".35rem"}}>
                      <span style={{fontSize:"1.8rem"}}>{sk.icon}</span>
                      <span className="chip" style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"#7a6a9a",fontSize:".68rem"}}>
                        {seen_n}/{total_n}
                      </span>
                    </div>
                    <div style={{color:sk.color,fontWeight:700,fontFamily:"'Crimson Pro',serif",fontSize:"1rem"}}>{sk.label}</div>
                    <div style={{color:"#6a5a8a",fontFamily:"'Crimson Pro',serif",fontSize:".74rem",margin:".18rem 0 .6rem"}}>
                      {total_n} questions · no repeats
                    </div>
                    {done>0 ? (
                      <>
                        <div className="pbg" style={{marginBottom:".3rem"}}>
                          <div className="pfill" style={{width:`${pct}%`,background:sk.color}}/>
                        </div>
                        <span style={{color:sk.color,fontFamily:"'Crimson Pro',serif",fontSize:".74rem",fontWeight:600}}>
                          {corr}/{done} correct · {pct}%
                        </span>
                      </>
                    ):(
                      <span style={{color:sk.color,fontFamily:"'Crimson Pro',serif",fontSize:".77rem",opacity:.6,fontStyle:"italic"}}>Tap to start →</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="card" style={{background:"linear-gradient(135deg,rgba(52,211,153,.07),rgba(52,211,153,.03))",border:"1px solid rgba(52,211,153,.18)"}}>
              <p style={{color:"#34d399",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",fontWeight:600,marginBottom:".3rem"}}>💡 {phase.name} Tip</p>
              <p style={{color:"#8b7ba0",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",lineHeight:1.65}}>{phase.tip}</p>
            </div>
          </div>
        )}

        {/* ══ PRACTICE — exercise ══ */}
        {view==="practice" && activeSkill && exercise && (
          <div className="fade">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                <button className="ghost" onClick={backToSkills}>← Skills</button>
                {(()=>{const sk=SKILLS.find(s=>s.id===activeSkill); return(
                  <span className="chip" style={{background:sk.bg,border:`1px solid ${sk.border}`,color:sk.color}}>
                    {sk.icon} {sk.label} · {doneCount(activeSkill)}/{totalBank(activeSkill)}
                  </span>
                );})()}
              </div>
              {answered && (
                <button className="cta" onClick={nextExercise} style={{fontSize:".82rem",padding:".5rem 1.2rem"}}>
                  Next →
                </button>
              )}
            </div>

            {/* GRAMMAR */}
            {activeSkill==="grammar" && (
              <div className="card fade">
                <p style={{color:"#9b8fb0",fontFamily:"'Crimson Pro',serif",fontSize:".78rem",marginBottom:".7rem"}}>📝 Choose the correct word:</p>
                <h2 style={{color:"#f0e8ff",fontSize:"1.4rem",fontWeight:700,marginBottom:".3rem",lineHeight:1.3}}>{exercise.sentence}</h2>
                <p style={{color:"#5a4a7a",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",marginBottom:"1.2rem",fontStyle:"italic"}}>"{exercise.translation}"</p>
                {exercise.options.map((opt,i)=>{
                  let cls="opt";
                  if(answered){cls+=" dis"; if(i===exercise.answer)cls+=" ok"; else if(i===selected)cls+=" bad";}
                  return (
                    <button key={i} className={cls} onClick={()=>choose(i)}>
                      <Dot reveal={answered} i={i} correct={i===exercise.answer} chosen={i===selected}/>{opt}
                    </button>
                  );
                })}
                {answered && exercise.explanation && (
                  <div style={{marginTop:".8rem",padding:".65rem 1rem",borderRadius:10,background:"rgba(129,140,248,.1)",border:"1px solid rgba(129,140,248,.22)",color:"#a5b4fc",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",lineHeight:1.55}}>
                    💡 {exercise.explanation}
                  </div>
                )}
              </div>
            )}

            {/* VOCABULARY */}
            {activeSkill==="vocabulary" && (
              <div className="card fade">
                <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".8rem"}}>
                  <p style={{color:"#9b8fb0",fontFamily:"'Crimson Pro',serif",fontSize:".78rem"}}>📖 What does this word mean?</p>
                  <span className="chip" style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",color:"#34d399"}}>{exercise.category}</span>
                </div>
                <div style={{textAlign:"center",padding:"1rem 0 1.3rem"}}>
                  <div style={{fontSize:"3.2rem",marginBottom:".4rem"}}>{exercise.emoji}</div>
                  <div style={{color:"#f0e8ff",fontSize:"2rem",fontWeight:700}}>{exercise.word}</div>
                </div>
                {exercise.options.map((opt,i)=>{
                  let cls="opt";
                  if(answered){cls+=" dis"; if(i===exercise.answer)cls+=" ok"; else if(i===selected)cls+=" bad";}
                  return (
                    <button key={i} className={cls} onClick={()=>choose(i)}>
                      <Dot reveal={answered} i={i} correct={i===exercise.answer} chosen={i===selected}/>{opt}
                    </button>
                  );
                })}
                {answered && (
                  <div style={{marginTop:".8rem",padding:".65rem 1rem",borderRadius:10,background:"rgba(52,211,153,.09)",border:"1px solid rgba(52,211,153,.22)",color:"#6ee7b7",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",lineHeight:1.6}}>
                    📖 <em>{exercise.example_es}</em><br/>
                    <span style={{color:"#5a4a7a",fontSize:".8rem"}}>{exercise.example_en}</span>
                  </div>
                )}
              </div>
            )}

            {/* LISTENING */}
            {activeSkill==="listening" && (
              <div className="card fade">
                <p style={{color:"#9b8fb0",fontFamily:"'Crimson Pro',serif",fontSize:".78rem",marginBottom:".7rem"}}>🔊 Listen, then answer:</p>
                <button
                  onClick={()=>{setSpeaking(true);setPlayed(true);speak(exercise.passage,()=>setSpeaking(false));}}
                  disabled={speaking}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".6rem",width:"100%",
                    padding:".85rem",borderRadius:12,marginBottom:"1.1rem",
                    cursor:speaking?"not-allowed":"pointer",
                    border:"2px solid rgba(244,114,182,.32)",
                    background:speaking?"rgba(244,114,182,.14)":"rgba(244,114,182,.07)",
                    color:"#f9a8d4",fontFamily:"'Crimson Pro',serif",fontSize:".95rem",transition:"all .2s"}}>
                  {speaking?"⏳ Playing…": played?"🔁 Play again":"▶️ Play the audio"}
                </button>
                {!played && <p style={{color:"#4a3a6a",fontFamily:"'Crimson Pro',serif",fontSize:".8rem",textAlign:"center",marginBottom:".8rem",fontStyle:"italic"}}>Press play first, then answer.</p>}
                <h3 style={{color:"#f0e8ff",fontSize:"1.1rem",fontWeight:700,marginBottom:"1rem",lineHeight:1.3}}>{exercise.question}</h3>
                {(played||answered) && exercise.options.map((opt,i)=>{
                  let cls="opt";
                  if(answered){cls+=" dis"; if(i===exercise.answer)cls+=" ok"; else if(i===selected)cls+=" bad";}
                  return (
                    <button key={i} className={cls} onClick={()=>{if(played)choose(i);}}>
                      <Dot reveal={answered} i={i} correct={i===exercise.answer} chosen={i===selected}/>{opt}
                    </button>
                  );
                })}
                {answered && (
                  <div style={{marginTop:".8rem",padding:".65rem 1rem",borderRadius:10,background:"rgba(244,114,182,.09)",border:"1px solid rgba(244,114,182,.22)",color:"#f9a8d4",fontFamily:"'Crimson Pro',serif",fontSize:".85rem",fontStyle:"italic",lineHeight:1.55}}>
                    🗣️ "{exercise.passage}"
                  </div>
                )}
              </div>
            )}

            {/* WRITING */}
            {activeSkill==="writing" && (
              <div className="card fade">
                <p style={{color:"#9b8fb0",fontFamily:"'Crimson Pro',serif",fontSize:".78rem",marginBottom:".6rem"}}>✍️ Write in Spanish:</p>
                <h3 style={{color:"#f0e8ff",fontSize:"1.15rem",fontWeight:700,marginBottom:".3rem",lineHeight:1.35}}>{exercise.prompt_en}</h3>
                <p style={{color:"#6a5a8a",fontFamily:"'Crimson Pro',serif",fontSize:".87rem",marginBottom:".5rem",fontStyle:"italic"}}>{exercise.prompt_es}</p>
                {exercise.hint && (
                  <p style={{color:"#f59e0b",fontFamily:"'Crimson Pro',serif",fontSize:".8rem",marginBottom:".85rem"}}>
                    💡 Use: <strong>{exercise.hint}</strong>
                  </p>
                )}
                <textarea className="wi" value={typed} disabled={answered}
                  onChange={e=>setTyped(e.target.value)}
                  placeholder="Escribe aquí en español…"/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:".5rem"}}>
                  <span style={{color:"#4a3a6a",fontFamily:"'Crimson Pro',serif",fontSize:".75rem"}}>
                    {typed.trim().split(/\s+/).filter(Boolean).length} words · aim for {exercise.words_min}–{exercise.words_max}
                  </span>
                  {!answered && (
                    <button className="cta" onClick={submitWriting} disabled={!typed.trim()} style={{fontSize:".82rem",padding:".5rem 1.2rem"}}>
                      Check ✓
                    </button>
                  )}
                </div>
                {answered && showAnswer && (
                  <>
                    <div style={{marginTop:".9rem",padding:".8rem 1rem",borderRadius:10,background:"rgba(74,222,128,.08)",border:"1px solid rgba(74,222,128,.22)",color:"#86efac",fontFamily:"'Crimson Pro',serif",fontSize:".87rem",lineHeight:1.65}}>
                      ✅ Well done! Compare your answer with the example below. Check: verb tenses, agreement, and spelling.
                    </div>
                    <div style={{marginTop:".55rem",padding:".65rem 1rem",borderRadius:10,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",color:"#8b7ba0",fontFamily:"'Crimson Pro',serif",fontSize:".84rem",fontStyle:"italic",lineHeight:1.6}}>
                      ✍️ <strong style={{color:"#c4b5d4",fontStyle:"normal"}}>Model answer:</strong> "{exercise.example}"
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ PROGRESS ══ */}
        {view==="progress" && (
          <div className="fade">
            <h2 style={{color:"#f0e8ff",fontSize:"1.3rem",fontWeight:700,marginBottom:".3rem"}}>Your Progress</h2>
            <p style={{color:"#7a6b9a",fontFamily:"'Crimson Pro',serif",fontSize:".88rem",marginBottom:"1.3rem"}}>
              A1.2 → B1 · {Object.values(BANK).flat().length} total unique questions
            </p>

            <div className="card" style={{marginBottom:"1.1rem",background:"linear-gradient(135deg,rgba(168,85,247,.1),rgba(124,58,237,.05))",border:"1px solid rgba(168,85,247,.22)"}}>
              <p style={{color:"#b084fc",fontFamily:"'Crimson Pro',serif",fontSize:".82rem",marginBottom:".9rem",fontWeight:600}}>🗺️ Level Journey</p>
              <div style={{display:"flex",alignItems:"center",marginBottom:".6rem"}}>
                {["A1.2","","A2","","A2+","","B1"].map((l,i)=>(
                  i%2===0?(
                    <div key={i} style={{textAlign:"center",flex:"0 0 auto",width:"14%"}}>
                      <div style={{width:30,height:30,borderRadius:"50%",margin:"0 auto .28rem",
                        background:i===0?"#a855f7":totalDone>40&&i===6?"#4ade80":"rgba(255,255,255,.06)",
                        border:`2px solid ${i===0?"#a855f7":totalDone>40&&i===6?"#4ade80":"rgba(255,255,255,.12)"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        color:i===0||(totalDone>40&&i===6)?"#fff":"#4a3a6a",
                        fontFamily:"'Crimson Pro',serif",fontSize:".68rem",fontWeight:700}}>
                        {i===0?"★":totalDone>40&&i===6?"★":"○"}
                      </div>
                      <div style={{color:i===0?"#c084fc":"#5a4a7a",fontFamily:"'Crimson Pro',serif",fontSize:".72rem"}}>{l}</div>
                    </div>
                  ):(
                    <div key={i} style={{flex:1,height:3,background:"rgba(255,255,255,.07)",borderRadius:2,margin:"0 .1rem .9rem"}}/>
                  )
                ))}
              </div>
              <div className="pbg">
                <div className="pfill" style={{width:`${Math.min(totalDone*2,100)}%`}}/>
              </div>
              <p style={{color:"#5a4a7a",fontFamily:"'Crimson Pro',serif",fontSize:".75rem",marginTop:".4rem"}}>
                {totalDone===0?"Start practicing to track your progress! 💪":`${totalDone} exercises done · ${accuracy}% overall accuracy`}
              </p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem",marginBottom:"1.1rem"}}>
              {SKILLS.map(sk=>{
                const done=scores[sk.id].length, corr=scores[sk.id].filter(Boolean).length;
                const pct=done?Math.round(corr/done*100):0;
                return (
                  <div key={sk.id} className="card" style={{background:sk.bg,border:`1px solid ${sk.border}`}}>
                    <div style={{fontSize:"1.4rem",marginBottom:".3rem"}}>{sk.icon}</div>
                    <div style={{color:"#f0e8ff",fontFamily:"'Crimson Pro',serif",fontWeight:600,fontSize:".95rem"}}>{sk.label}</div>
                    <div style={{color:sk.color,fontFamily:"'Crimson Pro',serif",fontSize:"1.65rem",fontWeight:700,margin:".2rem 0"}}>
                      {done>0?`${pct}%`:"—"}
                    </div>
                    <div style={{color:"#5a4a7a",fontFamily:"'Crimson Pro',serif",fontSize:".72rem",marginBottom:".5rem"}}>
                      {doneCount(sk.id)}/{totalBank(sk.id)} seen · {corr} correct
                    </div>
                    <div className="pbg"><div className="pfill" style={{width:`${pct}%`,background:sk.color}}/></div>
                  </div>
                );
              })}
            </div>

            <div className="card">
              <h3 style={{color:"#f0e8ff",fontWeight:700,fontSize:".95rem",marginBottom:".9rem"}}>🌍 Boost Outside This App</h3>
              {[
                ["🎬","Netflix","Watch with Spanish subtitles: La Casa de Papel, Club de Cuervos"],
                ["🎙️","Podcast","'Coffee Break Spanish' or 'Español con Juan' (free, A1–B1)"],
                ["📱","Anki","'Spanish 2000 words' deck — 10 min/day of spaced repetition"],
                ["🗣️","Tandem / HelloTalk","Language exchange with native speakers (free)"],
                ["📖","Duolingo Stories","Short interactive stories — great for A2–B1 reading"],
                ["📝","LangCorrect","Post your writing — natives correct it for free"],
              ].map(([e,n,d])=>(
                <div key={n} style={{display:"flex",alignItems:"flex-start",gap:".75rem",padding:".55rem 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <span style={{fontSize:"1.1rem",flexShrink:0,marginTop:".1rem"}}>{e}</span>
                  <div>
                    <div style={{color:"#e0d8f0",fontFamily:"'Crimson Pro',serif",fontSize:".88rem",fontWeight:600}}>{n}</div>
                    <div style={{color:"#6a5a8a",fontFamily:"'Crimson Pro',serif",fontSize:".78rem",lineHeight:1.5}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({reveal,i,correct,chosen}){
  const ok=reveal&&correct, bad=reveal&&chosen&&!correct;
  return (
    <span style={{width:22,height:22,borderRadius:"50%",flexShrink:0,
      background:ok?"#4ade80":bad?"#ef4444":"rgba(255,255,255,.09)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:".68rem",fontWeight:700,color:ok||bad?"#fff":"#7a6b9a"}}>
      {ok?"✓":bad?"✗":String.fromCharCode(65+i)}
    </span>
  );
}
