import { useForm } from '@ethang/use-form/index.js';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import type { ChangeEvent, JSX } from 'react';

import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

type FormulateProperties = {
  currentValue: number;
  defaultValue: number;
  multiplier: number;
  step: number;
  totalCost: number;
};

const formulate = ({
  multiplier,
  step,
  totalCost,
  currentValue,
  defaultValue,
}: FormulateProperties): number => {
  if (currentValue > defaultValue) {
    return totalCost + ((currentValue - defaultValue) / step) * multiplier;
  }

  return totalCost;
};

const initialState = {
  advancedDeploymentProtection: false,
  bandwidth: 1000,
  concurrentBuilds: 1,
  edgeConfig: 1_000_000,
  edgeFunctions: 1_000_000,
  edgeMiddleware: 1_000_000,
  kvDataTransfer: 0.5,
  kvDatabases: 1,
  kvRequests: 150_000,
  kvStorage: 0.5,
  monitoring: 0,
  pgComputeTime: 100,
  pgDataTransfer: 0.5,
  pgDatabases: 1,
  pgStorage: 0.5,
  pgWrites: 0.5,
  previewDeploymentSuffix: false,
  remoteCacheArtifactDownloads: 10,
  serverlessFunctionExecution: 1000,
  sourceImages: 5000,
  teamMembers: 0,
  webAnalytics: 25_000,
};

export default function (): JSX.Element {
  let totalCost = 20;

  const { formState, handleChange } = useForm(initialState);

  totalCost = formulate({
    currentValue: formState.edgeFunctions,
    defaultValue: initialState.edgeFunctions,
    multiplier: 2,
    step: 1_000_000,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.edgeMiddleware,
    defaultValue: initialState.edgeMiddleware,
    multiplier: 0.65,
    step: 1_000_000,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.serverlessFunctionExecution,
    defaultValue: initialState.serverlessFunctionExecution,
    multiplier: 40,
    step: 100,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.sourceImages,
    defaultValue: initialState.sourceImages,
    multiplier: 5,
    step: 1000,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.concurrentBuilds,
    defaultValue: initialState.concurrentBuilds,
    multiplier: 50,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.bandwidth,
    defaultValue: initialState.bandwidth,
    multiplier: 40,
    step: 100,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.teamMembers,
    defaultValue: initialState.teamMembers,
    multiplier: 20,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.remoteCacheArtifactDownloads,
    defaultValue: initialState.remoteCacheArtifactDownloads,
    multiplier: 0.5,
    step: 1,
    totalCost,
  });

  if (formState.previewDeploymentSuffix) {
    totalCost += 100;
  }

  if (formState.monitoring > 0) {
    totalCost += 10;

    totalCost = formulate({
      currentValue: formState.monitoring,
      defaultValue: 1_250_000,
      multiplier: 9,
      step: 1_000_000,
      totalCost,
    });
  }

  totalCost = formulate({
    currentValue: formState.webAnalytics,
    defaultValue: initialState.webAnalytics,
    multiplier: 14,
    step: 100_000,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.kvDatabases,
    defaultValue: initialState.kvDatabases,
    multiplier: 1,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.kvRequests,
    defaultValue: initialState.kvRequests,
    multiplier: 0.35,
    step: 100_000,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.kvStorage,
    defaultValue: initialState.kvStorage,
    multiplier: 0.3,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.kvDataTransfer,
    defaultValue: initialState.kvDataTransfer,
    multiplier: 0.2,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.pgDatabases,
    defaultValue: initialState.pgDatabases,
    multiplier: 1,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.pgComputeTime,
    defaultValue: initialState.pgComputeTime,
    multiplier: 0.1,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.pgStorage,
    defaultValue: initialState.pgStorage,
    multiplier: 0.3,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.pgWrites,
    defaultValue: initialState.pgWrites,
    multiplier: 0.1,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.pgDataTransfer,
    defaultValue: initialState.pgDataTransfer,
    multiplier: 0.2,
    step: 1,
    totalCost,
  });

  totalCost = formulate({
    currentValue: formState.edgeConfig,
    defaultValue: initialState.edgeConfig,
    multiplier: 3,
    step: 1_000_000,
    totalCost,
  });

  return (
    <div>
      <Heading variant="h2">Vercel Pro Price Calculator</Heading>
      <Paragraph>
        <A isExternal href="https://vercel.com/pricing">
          Pricing Source
        </A>
      </Paragraph>
      <Paragraph>
        Monthly Cost:{' '}
        {Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency',
        }).format(totalCost)}
      </Paragraph>
      <Checkbox
        className="m-2"
        name="previewDeploymentSuffix"
        value={String(formState.previewDeploymentSuffix)}
        onChange={(event): void => {
          handleChange(event as unknown as ChangeEvent<Element>);
        }}
      >
        Preview Deployment Suffix
      </Checkbox>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <Input
          label="Edge Function Executions"
          min={initialState.edgeFunctions}
          name="edgeFunctions"
          step={1_000_000}
          type="number"
          value={String(formState.edgeFunctions)}
          onChange={handleChange}
        />
        <Input
          label="Edge Middleware Invocations"
          min={initialState.edgeMiddleware}
          name="edgeMiddleware"
          step={1_000_000}
          type="number"
          value={String(formState.edgeMiddleware)}
          onChange={handleChange}
        />
        <Input
          label="Serverless Function Executions"
          min={initialState.serverlessFunctionExecution}
          name="serverlessFunctionExecution"
          step={100}
          type="number"
          value={String(formState.serverlessFunctionExecution)}
          onChange={handleChange}
        />
        <Input
          label="Source Images"
          min={initialState.sourceImages}
          name="sourceImages"
          step={1000}
          type="number"
          value={String(formState.sourceImages)}
          onChange={handleChange}
        />
        <Input
          label="Concurrent Builds"
          min={initialState.concurrentBuilds}
          name="concurrentBuilds"
          step={1}
          type="number"
          value={String(formState.concurrentBuilds)}
          onChange={handleChange}
        />
        <Input
          label="Bandwidth (GB)"
          min={initialState.bandwidth}
          name="bandwidth"
          step={100}
          type="number"
          value={String(formState.bandwidth)}
          onChange={handleChange}
        />
        <Input
          label="Team Members"
          min={initialState.teamMembers}
          name="teamMembers"
          step={1}
          type="number"
          value={String(formState.teamMembers)}
          onChange={handleChange}
        />
        <Input
          label="Remote Cache Artifact Downloads (GB)"
          min={initialState.remoteCacheArtifactDownloads}
          name="remoteCacheArtifactDownloads"
          step={1}
          type="number"
          value={String(formState.remoteCacheArtifactDownloads)}
          onChange={handleChange}
        />
        <Input
          label="Monitoring (Data Points)"
          min={initialState.monitoring}
          name="monitoring"
          step={250_000}
          type="number"
          value={String(formState.monitoring)}
          onChange={handleChange}
        />
        <Input
          label="Web Analytics Events"
          min={initialState.webAnalytics}
          name="webAnalytics"
          step={100_000}
          type="number"
          value={String(formState.webAnalytics)}
          onChange={handleChange}
        />
        <Input
          label="KV Databases"
          min={initialState.kvDatabases}
          name="kvDatabases"
          step={1}
          type="number"
          value={String(formState.kvDatabases)}
          onChange={handleChange}
        />
        <Input
          label="KV Requests"
          min={initialState.kvRequests}
          name="kvRequests"
          step={100_000}
          type="number"
          value={String(formState.kvRequests)}
          onChange={handleChange}
        />
        <Input
          label="KV Storage (GB)"
          min={initialState.kvStorage}
          name="kvStorage"
          step={1}
          type="number"
          value={String(formState.kvStorage)}
          onChange={handleChange}
        />
        <Input
          label="KV Data Transfer (GB)"
          min={initialState.kvDataTransfer}
          name="kvDataTransfer"
          step={1}
          type="number"
          value={String(formState.kvDataTransfer)}
          onChange={handleChange}
        />
        <Input
          label="Postgres Databases"
          min={initialState.pgDatabases}
          name="pgDatabases"
          step={1}
          type="number"
          value={String(formState.pgDatabases)}
          onChange={handleChange}
        />
        <Input
          label="Postgres Compute Time (hrs)"
          min={initialState.pgComputeTime}
          name="pgComputeTime"
          step={1}
          type="number"
          value={String(formState.pgComputeTime)}
          onChange={handleChange}
        />
        <Input
          label="Postgres Storage (GB)"
          min={initialState.pgStorage}
          name="pgStorage"
          step={1}
          type="number"
          value={String(formState.pgStorage)}
          onChange={handleChange}
        />
        <Input
          label="Postgres Writes (GB)"
          min={initialState.pgWrites}
          name="pgWrites"
          step={1}
          type="number"
          value={String(formState.pgWrites)}
          onChange={handleChange}
        />
        <Input
          label="Postgres Data Transfer (GB)"
          min={initialState.pgDataTransfer}
          name="pgDataTransfer"
          step={1}
          type="number"
          value={String(formState.pgDataTransfer)}
          onChange={handleChange}
        />
        <Input
          label="Edge Config Reads"
          min={initialState.edgeConfig}
          name="edgeConfig"
          step={1_000_000}
          type="number"
          value={String(formState.edgeConfig)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
