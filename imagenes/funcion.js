function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

// ---------------------validacion del rfc---------------------------


//Función para validar un RFC
// Devuelve el RFC sin espacios ni guiones si es correcto
// Devuelve false si es inválido
// (debe estar en mayúsculas, guiones y espacios intermedios opcionales)
function rfcValido(rfc, aceptarGenerico = true) {
    const ree       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var   validadoo = rfc.match(ree);

    if (!validadoo)  //Coincide con el formato general del regex?
        return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificadorr = validadoo.pop(),
          rfcSinDigitoo      = validadoo.slice(1).join(''),
          len               = rfcSinDigitoo.length,

    //Obtener el digito esperado
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    var   sumaa,
          digitoEsperadoo;

    if (len == 12) sumaa = 0
    else sumaa = 481; //Ajuste para persona moral

    for(var i=0; i<len; i++)
        sumaa += diccionario.indexOf(rfcSinDigitoo.charAt(i)) * (indice - i);
    digitoEsperadoo = 11 - sumaa % 11;
    if (digitoEsperadoo == 11) digitoEsperadoo = 0;
    else if (digitoEsperadoo == 10) digitoEsperadoo = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificadorr != digitoEsperadoo)
     && (!aceptarGenerico || rfcSinDigitoo + digitoVerificadorr != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigitoo + digitoVerificadorr == "XEXX010101000")
        return false;
    return rfcSinDigitoo + digitoVerificadorr;
}


//Handler para el evento cuando cambia el input
// -Lleva la RFC a mayúsculas para validarlo
// -Elimina los espacios que pueda tener antes o después
function validaInput(input) {
    var rfc         = input.value.trim().toUpperCase(),
        resultadoo   = document.getElementById("resultado"),
        validoo;
        
    var rfcCorrecto = rfcValido(rfc);   // Acá se comprueba
  
    if (rfcCorrecto) {
    	validoo = "Válidoo";
      resultadoo.classList.add("ok");
    } else {
    	validoo = "No válidoo"
    	resultadoo.classList.remove("ok");
    }
        
    resultadoo.innerText= "RFC: " + rfc 
                        + "\nResultado: " + rfcCorrecto
                        + "\nFormato: " + validoo;
}
