<?php
declare(strict_types=1);

// OpenMeteo SDK exists test

require_once __DIR__ . '/../openmeteo_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenMeteoSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
