package core

type OpenMeteoError struct {
	IsOpenMeteoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenMeteoError(code string, msg string, ctx *Context) *OpenMeteoError {
	return &OpenMeteoError{
		IsOpenMeteoError: true,
		Sdk:              "OpenMeteo",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenMeteoError) Error() string {
	return e.Msg
}
