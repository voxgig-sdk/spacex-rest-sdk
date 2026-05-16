package core

type SpacexRestError struct {
	IsSpacexRestError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSpacexRestError(code string, msg string, ctx *Context) *SpacexRestError {
	return &SpacexRestError{
		IsSpacexRestError: true,
		Sdk:              "SpacexRest",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SpacexRestError) Error() string {
	return e.Msg
}
