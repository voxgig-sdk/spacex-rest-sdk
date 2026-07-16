<?php
declare(strict_types=1);

// SpacexRest SDK base feature

class SpacexRestBaseFeature
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

    public function init(SpacexRestContext $ctx, array $options): void {}
    public function PostConstruct(SpacexRestContext $ctx): void {}
    public function PostConstructEntity(SpacexRestContext $ctx): void {}
    public function SetData(SpacexRestContext $ctx): void {}
    public function GetData(SpacexRestContext $ctx): void {}
    public function GetMatch(SpacexRestContext $ctx): void {}
    public function SetMatch(SpacexRestContext $ctx): void {}
    public function PrePoint(SpacexRestContext $ctx): void {}
    public function PreSpec(SpacexRestContext $ctx): void {}
    public function PreRequest(SpacexRestContext $ctx): void {}
    public function PreResponse(SpacexRestContext $ctx): void {}
    public function PreResult(SpacexRestContext $ctx): void {}
    public function PreDone(SpacexRestContext $ctx): void {}
    public function PreUnexpected(SpacexRestContext $ctx): void {}
}
