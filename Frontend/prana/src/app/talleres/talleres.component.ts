import { Component } from '@angular/core';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})



export class TalleresComponent {
  talleres = [
    
    {titulo: 'Yoga al aire libre',
    subtitulo: 'Encuentro VIVENCIAL-DETOX',
    imagen: '../../../assets/img/talleres/yoga.jpg',
    texto: 'Este taller te invita a desconectar del bullicio de la vida cotidiana y sumergirte en un espacio tranquilo donde podrás cultivar la armonía entre tu cuerpo, mente y espíritu.'},
    
    {titulo: 'Taller infantil - Alimentación saludable',
    subtitulo: '¡Qué Ricas Aventuras!',
    imagen:'../../../assets/img/talleres/ninos-divirtiendose-cocinando-cocina-casa.jpg',
    texto: 'Nuestro taller fomenta hábitos alimentarios positivos desde temprana edad, promoviendo un estilo de vida saludable y activo. ¡Únete a nosotros y enseña a tus hijos a disfrutar de una alimentación saludable de manera divertida y educativa!'},
    
    {titulo: 'Yoga para embarazadas',
    subtitulo: 'Nutre tu cuerpo y alma',
    imagen: '../../../assets/img/talleres/yoga-embarazada.jpg',
    texto: 'Diseñado específicamente para mujeres en esta etapa especial de sus vidas, este taller te ofrece una experiencia suave y segura para fortalecer tu cuerpo, relajar tu mente y cultivar un vínculo amoroso con tu bebé en crecimiento.'},
    
    {titulo: 'Cuerpos en movimiento',
    subtitulo: 'Descubre la alegría de moverte',
    imagen: '../../../assets/img/talleres/ninos-felices-jugando-juntos-al-aire-libre-bailando-sobre-cesped-disfrutando-actividades-al-aire-libre-divirtiendose-parque-concepto-fiesta-o-amistad-ninos.jpg',
    texto: 'Mediante juegos dinámicos, bailes, ejercicios y actividades interactivas, los niños descubrirán la importancia de mantenerse activos y cómo el movimiento puede ser divertido y beneficioso para su salud.'}
  ]


}
