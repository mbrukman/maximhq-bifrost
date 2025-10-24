package schemas

type BifrostListModelsRequest struct {
	Provider ModelProvider `json:"provider"`

	PageSize int `json:"page_size"`

	// PageToken: Token received from previous request to retrieve next page
	PageToken string `json:"page_token"`

	// ExtraParams: Additional provider-specific query parameters
	// This allows for flexibility to pass any custom parameters that specific providers might support
	ExtraParams map[string]interface{} `json:"-"`
}

type BifrostListModelsResponse struct {
	Data        []Model                    `json:"data"`
	ExtraFields BifrostResponseExtraFields `json:"extra_fields"`
	NextPageToken string `json:"next_page_token,omitempty"` // Token to retrieve next page

	// Anthropic specific fields
	FirstID *string `json:"-"`
	LastID *string `json:"-"`
	HasMore *bool `json:"-"`
}

type Model struct {
	ID                  string             `json:"id"`
	CanonicalSlug       *string            `json:"canonical_slug,omitempty"`
	Name                *string            `json:"name,omitempty"`
	Created             *int64               `json:"created,omitempty"`
	ContextLength       *int               `json:"context_length,omitempty"`
	Architecture        *Architecture      `json:"architecture,omitempty"`
	Pricing             *Pricing           `json:"pricing,omitempty"`
	TopProvider         *TopProvider       `json:"top_provider,omitempty"`
	PerRequestLimits    *PerRequestLimits  `json:"per_request_limits,omitempty"`
	SupportedParameters []string           `json:"supported_parameters,omitempty"`
	DefaultParameters   *DefaultParameters `json:"default_parameters,omitempty"`
	HuggingFaceID       *string            `json:"hugging_face_id,omitempty"`
	Description         *string            `json:"description,omitempty"`

	OwnedBy          *string  `json:"owned_by,omitempty"`
	SupportedMethods []string `json:"supported_methods,omitempty"`
}

type Architecture struct {
	Modality         *string  `json:"modality,omitempty"`
	Tokenizer        *string  `json:"tokenizer,omitempty"`
	InstructType     *string  `json:"instruct_type,omitempty"`
	InputModalities  []string `json:"input_modalities,omitempty"`
	OutputModalities []string `json:"output_modalities,omitempty"`
}

type Pricing struct {
	Prompt            *string `json:"prompt,omitempty"`
	Completion        *string `json:"completion,omitempty"`
	Request           *string `json:"request,omitempty"`
	Image             *string `json:"image,omitempty"`
	WebSearch         *string `json:"web_search,omitempty"`
	InternalReasoning *string `json:"internal_reasoning,omitempty"`
	InputCacheRead    *string `json:"input_cache_read,omitempty"`
	InputCacheWrite   *string `json:"input_cache_write,omitempty"`
}

type TopProvider struct {
	IsModerated         *bool    `json:"is_moderated,omitempty"`
	ContextLength       *float64 `json:"context_length,omitempty"`
	MaxCompletionTokens *float64 `json:"max_completion_tokens,omitempty"`
}

type PerRequestLimits struct {
	PromptTokens     *int `json:"prompt_tokens,omitempty"`
	CompletionTokens *int `json:"completion_tokens,omitempty"`
}

type DefaultParameters struct {
	Temperature      *float64 `json:"temperature,omitempty"`
	TopP             *float64 `json:"top_p,omitempty"`
	FrequencyPenalty *float64 `json:"frequency_penalty,omitempty"`
}
