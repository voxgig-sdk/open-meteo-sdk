<?php
declare(strict_types=1);

// OpenMeteo SDK base feature

class OpenMeteoBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenMeteoContext $ctx, array $options): void {}
    public function PostConstruct(OpenMeteoContext $ctx): void {}
    public function PostConstructEntity(OpenMeteoContext $ctx): void {}
    public function SetData(OpenMeteoContext $ctx): void {}
    public function GetData(OpenMeteoContext $ctx): void {}
    public function GetMatch(OpenMeteoContext $ctx): void {}
    public function SetMatch(OpenMeteoContext $ctx): void {}
    public function PrePoint(OpenMeteoContext $ctx): void {}
    public function PreSpec(OpenMeteoContext $ctx): void {}
    public function PreRequest(OpenMeteoContext $ctx): void {}
    public function PreResponse(OpenMeteoContext $ctx): void {}
    public function PreResult(OpenMeteoContext $ctx): void {}
    public function PreDone(OpenMeteoContext $ctx): void {}
    public function PreUnexpected(OpenMeteoContext $ctx): void {}
}
