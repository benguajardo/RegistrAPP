export interface Usuario{
    id?: string;
    correo?: string;
    contrasena?: string;
    rut?: string;
    nombre?: string;
    imagen?: string;
    carrera?: string;
    sede?: string;
    docente?: boolean;
    presente?: boolean;
}

export interface UsuarioDocente{
    id?: string;
    correo?: string;
    contrasena?: string;
    rut?: string;
    nombre?: string;
    imagen?: string;
    docente?: boolean;
}

export interface usuarioIniciado{
    id?: string;
    correo?: string;
    rut?: string;
    nombre?: string;
    apellido?: string;
    imagen?: string;
    carrera?: string;
    sede?: string;
    docente?: boolean;
}

export interface estudiantePresente{
    idPresente?: string;
    idClase?: string;
    rutEstudiante?: string;
    presente?: boolean;
    horaLlegada?: string;
}