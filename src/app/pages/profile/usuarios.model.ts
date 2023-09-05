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