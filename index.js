var express = require('express');
var app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
// URI to labMongoDB
var uri = 'mongodb://heroku_ng4vzrc8:7eiqqmqn0rldusdpvt2rb6u4hg@ds011419.mlab.com:11419/heroku_ng4vzrc8';
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

mongo.MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var noticias = db.collection('noticias');
});

app.get('/', function (request, response) {
    response.render('index.html');
});

var noticesItems = [
    {
        "img": "http://emergestudio.es/pruebas/eiimailer/uploads/bigIcon.png",
        "titulo": "Bienvenido a Eii Informa",
        "cuerpo": "Esta es la nueva app oficial de la Escuela de Ingeniería Informática de la ULPGC para mandar información acerca de cualquier noticia de interés para estudiantes e interesados. \n Disfruta de nuestra app y mantente informado de todas las noticias.",
        "clase": "none ",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/Programa-Mentor-2015.png",
        "titulo": "Participa en el PROGRAMA MENTOR DE LA EII para el curso 2015-16",
        "cuerpo": "¿Te apetece ayudar a otros estudiantes de nuevo ingreso en la Escuela a integrarse? Buscamos estudiantes de cursos superiores que se apunten a liderar un grupo de 10-15 estudiantes y que les ayuden en su nueva vida con nosotros. ¿Te animas? La experiencia el curso pasado fue fantástica, muy divertida y enriquecedora. No te quitará tiempo y ayudarás a nuevos compañeros. Si te apetece participar como MENTOR en el Programa MENTOR 2015-16, simplemente rellena y envía el formulario que encontrarás en el siguiente enlace, como mucho el 3 de septiembre de 2015: <a onclick=\"window.open('http://www.eii.ulpgc.es/tb_university_ex/?q=article/programa-mentor-eii-2015-16')\">programa mentor </a>\n",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/Formación-profesional-especializada-EII-2015-16.png",
        "titulo": "Nueva oferta de estudios de FORMACIÓN PROFESIONAL ESPECIALIZADA en la EII para el curso 2015-16",
        "cuerpo": "¿Tienes un CICLO FORMATIVO SUPERIOR EN INFORMÁTICA? Desde este curso 2015-16 puedes AMPLIAR tu formación con los Cursos de FORMACIÓN PROFESIONAL ESPECIALIZADA en nuestra Escuela. Por fin podrás acceder a especializarte en contenido puntero en Informática en la Universidad de Las Palmas de Gran Canaria. PREINSCRIPCIÓN abierta del 6 al 24 de Julio de 2015. Ofrecemos 3 cursos, con un total de 56 plazas.  Más información en la web del Centro: <a onclick=\"window.open('http://www.eii.ulpgc.es/tb_university_ex/?q=formacion-profesional-especializada-2015-16')\">Formación Profesional Especializada</a>",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/Captura de pantalla 2015-07-04 17_44_28.png",
        "titulo": "Explicación detallada de las DISTINTAS MENCIONES del Grado en Ingeniería Informática de la EII",
        "cuerpo": "¿Quiéres más información sobre qué MENCIÓN escoger de nuestro Grado en Ingeniería Informática? Ahora tienes una sección en la web del Centro con una explicación detallada: <a onclick=\"window.open('http://www.eii.ulpgc.es/tb_university_ex/?q=menciones-del-grado-en-ingenieria-informatica')\">Menciones</a>",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/Posgrados-2015---EII.jpg",
        "titulo": "Abierto periodo de PREINSCRIPCIÓN a la oferta de POSGRADOS en Ingenier-ía Informática",
        "cuerpo": "Abierta la preinscripción del 15 de Junio al 3 de Jullio de 2015 : Estudia un POSGRADO en nuestra Escuela de Ingeniería Informática de la ULPGC. La oferta para este curso 2015-16 va desde un Máster Oficial en Ingeniería Informática con tres especialidades de entre las que elegir (Tecnología Web y Negocio Digital, Programación de Dispositivos Móviles y Virtualización, Computación en la Nube y Supercomputación), Un Experto Universitario en “Virtualización y Computación en la Nube” (24 créditos), hasta un Experto Universitario en “Diseño y Programación de Videojuegos” (30 créditos). Más información en:<a onclick=\"window.open(' http://eii.ulpgc.es/estudios','_system')\"> http://eii.ulpgc.es/estudios</a>",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/O_1170_93258.png",
        "titulo": "ENCUESTA SOBRE EL USO DE TIC DENTRO Y FUERA DEL AULA DE LA EII 2014",
        "cuerpo": "Con vistas a la realización de un estudio de los elementos tecnológicos que se utilizan tanto en casa como en la Escuela, procedemos a elaborar una encuesta con la que se pretende incentivar el uso de las TICs (Tecnologías de la Información y de la Comunicación) en el aula y fuera del aula, de forma que podamos mejorar los medios que se requieren para el uso de la misma (WIFI, salas de estudio, enchufes para cargar dispositivos, ...) Te animamos a que realices la encuesta para poder mejorar los elementos necesarios que involucran el uso de las Tecnologías de la Información y de la Comunicación (TICs) dentro y fuera del Aula. Agradecemos tu participación.  Con tu colaboración nos ayudas a mejorar. Para realizar la encuesta :<a onclick=\"window.open(' http://eii.ulpgc.es/limesurvey/index.php/survey/index/sid/129969/newtest/Y/lang/es','_system')\"> http://eii.ulpgc.es/limesurvey/index.php/survey/index/sid/129969/newtest/Y/lang/es</a>",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/O_796_Sugerencias de la EII.png",
        "titulo": "Nuevo BUZÓN DE SUGERENCIAS de la página web de la EII",
        "cuerpo": "Desde la Escuela de Ingeniería Informática deseamos que nos ayudes a mejorar nuestro servicio. Para ello hemos puesto en marchar un BUZÓN DE SUGERENCIAS al que puedes acceder desde la propia página web del Centro :<a onclick=\"window.open(' http://www.eii.ulpgc.es','_system')\"> http://www.eii.ulpgc.es</a> (desde el menú de CALIDAD, o mediante el enlace gráfico que hay en la tercera columna). No dudes en utilizarla y darnos tu feedback o ideas para mejorar, estamos muy receptivos a escucharte. Gracias por tu aportación.",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/Feliz-Verano-EII-2015.png",
        "titulo": "¡Feliz Verano 2015, nos vemos en Septiembre!",
        "cuerpo": "Estimados compañeros/as:  Desde la Escuela de Ingeniería Informática de la ULPGC queremos agradecer tu esfuerzo por el trabajo realizado durante este curso 2014/15.   Estamos convencidos de que ha sido un curso duro, de mucho trabajo, y en el que se han cumplido muchos objetivos.  Ahora sólo queda disfrutar de un merecido descanso, que buena falta nos hace, y así aprovechar, recargar pilas y así venir renovados para el próximo curso 2015/16.  Aprovechamos para informarte de que nuestro Edificio estará cerrado del 10 al 30 de Agosto de 2015 (ambos inclusive), según la Resolución del Rector de 23 de Julio de 2015 (ver resolución y servicios esenciales:<a onclick=\"window.open(' https://www.ulpgc.es/sites/default/files/ArchivosULPGC/noticia/2015/Jul/resolucion_cierre_agosto_2015.pdf','_system')\"> https://www.ulpgc.es/sites/default/files/ArchivosULPGC/noticia/2015/Jul/resolucion_cierre_agosto_2015.pdf</a> ).   Recibe un cordial saludo, y ¡Feliz Verano!. Nos vemos en septiembre de 2015.  Fran Santana",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/O_3294_92581.jpeg",
        "titulo": "Jornadas de Videojuegos y e-sports en el CC Las Ramblas en Junio y Julio 2015",
        "cuerpo": "La Escuela de Ingeniería Informática colabora en la realización de las Jornadas LAS RAMBLAS GAMING con motivo del 7º Aniversario del CC LAS RAMBLAS, con evento para los “jugones” de videojuegos (Geometry Dash, Give UP, Just Dance, Alien Isolation, Mortal Combat, Halo Anniversary, …) , “deportistas virtuales” con e-sports (Tekken, Ultimate SFIV, LOL, FIFA 2015, Heart Stone, Counter Strike), “bailones” con el Just Dance 2015, “creadores” con el MINECRAFT (consolas y PC), etc… ¿Te lo vas a perder? Dos semanas llenas de competiciones, diversión, entretenimiento, …. Vente del 25 al 28 de Junio y del 2 al 5 de Julio al CC Las Ramblas y diviértete con nosotros. Podrás utilizar todos los equipos de gama alta de forma GRATUITA. El evento estará lleno de actividades enfocadas al videojuego, teniendo en cuenta tanto su vertiente educativa como competitiva.  Más info en la web de la Escuela:<a onclick=\"window.open(' http://www.eii.ulpgc.es/tb_university_ex/?q=article/jornadas-de-gaming-en-el-cc-7-palmas-junio-y-julio-2015','_system')\"> http://www.eii.ulpgc.es/tb_university_ex/?q=article/jornadas-de-gaming-en-el-cc-7-palmas-junio-y-julio-2015</a>",
        "clase": " none",
        "vista": false
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/acto_bienvenida.png",
        "titulo": "Acto de Bienvenida a la EII - Curso 2015-16",
        "cuerpo": "Te informamos que el próximo miércoles 9 de septiembre de 2015 a las 8:30h, en la Sala de Grados del Edificio de Informática, tendrá lugar el Acto de Bienvenida a nuevos alumnos de la Escuela. Dirigido a los estudiantes nuevos en el Centro. Los estudiantes que no son nuevos este curso en el Centro tendrán sus clases, desde el mismo día, según el horario publicado en el Centro. Más información en :<a onclick=\"window.open(' http://www.eii.ulpgc.es/tb_university_ex/?q=article/acto-de-bienvenida-la-eii-curso-2015-16#','_system')\"> http://www.eii.ulpgc.es/tb_university_ex/?q=article/acto-de-bienvenida-la-eii-curso-2015-16#</a>",
        "clase": " none",
        "vista": false,
        "fecha": "03-09-2015"
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/09-22-2015 00:51:41",
        "titulo": "Taller gratuito de \"TÉCNICAS DE ESTUDIO\" para la Ingeniería Informática",
        "cuerpo": "Si quieres aprender a estudiar o bien a hablar en público, defender un proyecto, etc...  asiste al Taller grauito de “TÉCNICAS DE ESTUDIO PARA LA INGENIERÍA INFORMÁTICA”. El evento, que será gratuito, se celebrará en octubre 2015 (la fecha y días se consensuará entre el profesor y los estudiantes  pero has de retirar una entrada desde el enlace:<a onclick=\"window.open(' http://www.eii.ulpgc.es/tb_university_ex/?q=taller-de-tecnicas-de-estudio-para-la-ingenieria-informatica-curso-2015-16','_system')\"> http://www.eii.ulpgc.es/tb_university_ex/?q=taller-de-tecnicas-de-estudio-para-la-ingenieria-informatica-curso-2015-16</a>",
        "clase": " none",
        "vista": false,
        "fecha": "22-09-2015"
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/09-27-2015 23:01:00",
        "titulo": "TALLER sobre \"CÓMO GESTIONAR TU TIEMPO Y SER MÁS PRODUCTIVO\"",
        "cuerpo": "¡FANTÁSTICO TALLER SOBRE “CÓMO GESTIONAR TU TIEMPO  Y SER MÁS PRODUCTIVO” DE LA SPEGC. PRÓXIMO 7 de Octubre de 2015. 10 euros. Más info:<a onclick=\"window.open(' http://incubegc.com/wp-content/uploads/2015/09/SPEGC_Curso43_2015_Sep15.pdf','_system')\"> http://incubegc.com/wp-content/uploads/2015/09/SPEGC_Curso43_2015_Sep15.pdf</a> \n",
        "clase": " none",
        "vista": false,
        "fecha": "27-09-2015"
 }, {
        "img": "http://www.eii.ulpgc.es/app-eii-informa/uploads/09-29-2015 16:53:13",
        "titulo": "Proyecto CODECRAFT para enseñar a programar a niños y niñas",
        "cuerpo": "¿Tienes algún hijo/a sobrino/a amigo/a de entre 7 y 16 años al que le guste la informática, los videojuegos, o la tecnología? Apúntale a nuestro evento CODECRAFT 2015 que se celebrará en la Escuela de Ingeniería Informática en los meses de Octubre-2015 a Febrero-2016 y deja que “APRENDA A PROGRAMAR CON NOSOTROS”. Organizan la Escuela y la SPEGC (Sociedad de Promoción Económica de Gran Canaria - Cabildo de Gran Canaria). Más info:<a onclick=\"window.open(' http://www.codecraft.es/','_system')\"> http://www.codecraft.es/</a>",
        "clase": " none",
        "vista": false,
        "fecha": "29-09-2015"
}];


noticias.insert(noticesItems, function (err, result) {
    if (err) throw err;
});

app.get('/notices', function (req, res) {
    noticias.find(function (error, items) {
		res.json(items);
	});
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});