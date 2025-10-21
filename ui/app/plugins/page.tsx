"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePluginMutation, useGetPluginsQuery } from "@/lib/store";
import { Plugin } from "@/lib/types/plugins";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AddNewPluginSheet from "./sheets/addNewPluginSheet";

export default function PluginsPage() {
	const { data: plugins, isLoading } = useGetPluginsQuery();
	const customPlugins = useMemo(() => plugins?.filter((plugin) => plugin.isCustom), [plugins]);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
	const [deletePlugin, { isLoading: isDeleting }] = useDeletePluginMutation();

	const handleEdit = (plugin: Plugin) => {
		setSelectedPlugin(plugin);
		setIsSheetOpen(true);
	};

	const handleAddNew = () => {
		setSelectedPlugin(null);
		setIsSheetOpen(true);
	};

	const handleDelete = async (pluginName: string) => {
		if (!confirm(`Are you sure you want to delete the plugin "${pluginName}"?`)) {
			return;
		}

		try {
			await deletePlugin(pluginName).unwrap();
			toast.success('Plugin deleted successfully');
		} catch (error) {
			const errorMessage = error && typeof error === 'object' && 'data' in error
				? (error.data as any)?.error || 'Failed to delete plugin'
				: 'Failed to delete plugin';
			toast.error(errorMessage);
		}
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
		setSelectedPlugin(null);
	};

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Plugins</h1>
					<p className="text-muted-foreground mt-1">
						Manage custom plugins for your Bifrost deployment.{" "}
						<Link className="text-primary hover:underline" href="https://docs.getbifrost.ai/plugins" target="_blank">
							Learn more
						</Link>
					</p>
				</div>
				<Button onClick={handleAddNew}>
					<PlusIcon className="mr-2 h-4 w-4" />
					Install New Plugin
				</Button>
			</div>

			{isLoading ? (
				<div className="text-muted-foreground text-center">Loading plugins...</div>
			) : customPlugins && customPlugins.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{customPlugins.map((plugin) => (
						<Card key={plugin.name}>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									<span>{plugin.name}</span>
									<div className={`h-2 w-2 rounded-full ${plugin.enabled ? 'bg-green-500' : 'bg-gray-400'}`} />
								</CardTitle>
								<CardDescription className="break-all">
									{plugin.path || 'No path specified'}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
										onClick={() => handleEdit(plugin)}
									>
										<EditIcon className="mr-2 h-3 w-3" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
										onClick={() => handleDelete(plugin.name)}
										disabled={isDeleting}
									>
										<Trash2Icon className="mr-2 h-3 w-3" />
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<p className="text-muted-foreground mb-4 text-center">
							No custom plugins installed yet. Install your first plugin to get started.
						</p>
						<Button onClick={handleAddNew}>
							<PlusIcon className="mr-2 h-4 w-4" />
							Install New Plugin
						</Button>
					</CardContent>
				</Card>
			)}

			<AddNewPluginSheet 
				open={isSheetOpen} 
				onClose={handleCloseSheet} 
				plugin={selectedPlugin}
			/>
		</div>
	);
}
