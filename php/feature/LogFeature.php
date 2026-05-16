<?php
declare(strict_types=1);

// SpacexRest SDK log feature

require_once __DIR__ . '/BaseFeature.php';

class SpacexRestLogFeature extends SpacexRestBaseFeature
{
    private mixed $client;
    private ?array $options;
    private mixed $logger;

    public function __construct()
    {
        parent::__construct();
        $this->version = '0.0.1';
        $this->name = 'log';
        $this->active = true;
        $this->client = null;
        $this->options = null;
        $this->logger = null;
    }

    public function init(SpacexRestContext $ctx, array $options): void
    {
        $this->client = $ctx->client;
        $this->options = $options;
        $this->active = ($options['active'] ?? null) === true;

        if ($this->active) {
            if (isset($options['logger'])) {
                $this->logger = $options['logger'];
            } else {
                $this->logger = STDERR;
            }
        }
    }

    private function _loghook(string $hook, SpacexRestContext $ctx, string $level = 'info'): void
    {
        if (!$this->logger) {
            return;
        }
        $opname = $ctx->op ? $ctx->op->name : '';
        $msg = "hook={$hook} op={$opname}";
        if (is_resource($this->logger)) {
            fwrite($this->logger, "[" . strtoupper($level) . "] {$msg}\n");
        } elseif (is_callable($this->logger)) {
            ($this->logger)("[" . strtoupper($level) . "] {$msg}");
        }
    }

    public function PostConstruct(SpacexRestContext $ctx): void { $this->_loghook('PostConstruct', $ctx); }
    public function PostConstructEntity(SpacexRestContext $ctx): void { $this->_loghook('PostConstructEntity', $ctx); }
    public function SetData(SpacexRestContext $ctx): void { $this->_loghook('SetData', $ctx); }
    public function GetData(SpacexRestContext $ctx): void { $this->_loghook('GetData', $ctx); }
    public function SetMatch(SpacexRestContext $ctx): void { $this->_loghook('SetMatch', $ctx); }
    public function GetMatch(SpacexRestContext $ctx): void { $this->_loghook('GetMatch', $ctx); }
    public function PrePoint(SpacexRestContext $ctx): void { $this->_loghook('PrePoint', $ctx); }
    public function PreSpec(SpacexRestContext $ctx): void { $this->_loghook('PreSpec', $ctx); }
    public function PreRequest(SpacexRestContext $ctx): void { $this->_loghook('PreRequest', $ctx); }
    public function PreResponse(SpacexRestContext $ctx): void { $this->_loghook('PreResponse', $ctx); }
    public function PreResult(SpacexRestContext $ctx): void { $this->_loghook('PreResult', $ctx); }
}
