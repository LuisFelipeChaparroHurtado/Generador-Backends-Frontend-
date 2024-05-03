import { ToastrService } from 'ngx-toastr';

/**
 * Displays a notification message using Toastr.
 *
 * @param {string} tipo - The type of message to display: 'success', 'info', 'warning', or 'error'.
 * @param {string} mensaje - The content of the message to display.
 * @param {string} alerta - The title of the message to display.
 * @param {ToastrService} toastr - An instance of the ToastrService to display the message.
 */
export function mostrarMensaje(
  tipo: string,
  mensaje: string,
  alerta: string,
  toastr: ToastrService
): void {
  // Define default parameters for the Toastr notification
  const PARAMETROS = {
    timeOut: 3000, // The duration (in milliseconds) before the notification disappears
    closeButton: false, // Indicates if the notification should have a close button
    enableHtml: true, // Indicates if HTML content is allowed in the notification
    progressBar: true, // Indicates if a progress bar should be shown
    disableTimeOut: false, // Indicates if the notification should not time out
    positionClass: 'toast-bottom-right', // The position of the notification on the screen
  };
  // Determine the type of notification to display based on the 'tipo' argument
  switch (tipo) {
    case 'success':
      toastr.success(mensaje, alerta, PARAMETROS);
      break;
    case 'info':
      toastr.info(mensaje, alerta, PARAMETROS);
      break;
    case 'warning':
      toastr.warning(mensaje, alerta, PARAMETROS);
      break;
    case 'error':
      toastr.error(mensaje, alerta, PARAMETROS);
      break;
    default:
      toastr.clear(0); // Clear any current notifications
      break;
  }
}
